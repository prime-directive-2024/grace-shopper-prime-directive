/** @format */

const Sequelize = require('sequelize');
const db = require('../db');

const AlbumCart = db.define('albumCart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = AlbumCart;
