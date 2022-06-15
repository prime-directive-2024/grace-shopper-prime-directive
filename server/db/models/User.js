const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order.js');

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

User.prototype.order = async function () {
  const albums = await this.getAlbums();
  let albumId = [];
  let total = 0;
  //adding albums to order history
  for (let i = 0; i < albums.length; i++) {
    albumId.push(albums[i].id);
    total = total + parseInt(albums[i].price);
  }
  const order = await Order.create({ albums: albumId, price: total });
  this.addOrder(order);
  //removing albums from cart
  await this.removeAlbums(albums);
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
// const checkEmail = async (user) => {
//   try {
//     const existingUser = User.findAll({
//       where: {
//         email: user.email,
//       },
//     });
//     if (existingUser) {
//       const error = Error("This email is already in use!");
//       error.status = 401;
//       throw error;
//     }
//   } catch (error) {
//     throw error;
//   }
// };
// User.beforeCreate(checkEmail);
// User.beforeUpdate(checkEmail);
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
