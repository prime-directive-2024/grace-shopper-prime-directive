const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('Album', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Album;
