/** @format */

const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order.js');
const Cart = require('./Cart');
const Album = require('./Album');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};
User.prototype.checkout = async function (cartId) {
  const cart = await Cart.findByPk(cartId, {
    include: [
      {
        model: Album,
      },
    ],
  });

  let totalPrice = 0;
  for (let i = 0; i < cart.Albums.length; i++) {
    totalPrice +=
      parseInt(cart.Albums[i].dataValues.albumCart.dataValues.price) *
      parseInt(cart.Albums[i].dataValues.albumCart.dataValues.quantity);
  }
  const order = await Order.create({ totalPrice: parseInt(totalPrice) });
  this.addOrder(order);
  for (let i = 0; i < cart.Albums.length; i++) {
    const temp = await order.addAlbum(parseInt(cart.Albums[i].dataValues.id));

    await temp[0].update({
      quantity: cart.Albums[i].dataValues.albumCart.dataValues.quantity,
    });
  }
  await cart.removeAlbums(cart.Albums);
};

User.prototype.guestCheckout = async function (cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice +=
      parseInt(cart[i].price) * parseInt(cart[i].albumCart.quantity);
  }
  const order = await Order.create({ totalPrice: parseInt(totalPrice) });
  this.addOrder(order);
  for (let i = 0; i < cart.length; i++) {
    const newOrderItem = await order.addAlbum(parseInt(cart[i].id));
    await newOrderItem[0].update({
      quantity: cart[i].albumCart.quantity,
    });
  }
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'No user found';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};
const addCart = async (user) => {
  const cart = await Cart.create();
  await user.addCart(cart);
};
User.afterCreate(addCart);
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
