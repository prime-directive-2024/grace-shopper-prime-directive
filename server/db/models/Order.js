/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
