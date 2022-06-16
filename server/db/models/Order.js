/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Order;
