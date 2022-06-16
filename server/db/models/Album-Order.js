/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const AlbumOrder = db.define('albumOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = AlbumOrder;
