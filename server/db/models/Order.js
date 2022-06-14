const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
  albums: {
    type: Sequelize.ARRAY({ type: Sequelize.INTEGER }),
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Order;
