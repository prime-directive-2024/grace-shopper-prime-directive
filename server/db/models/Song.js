const Sequelize = require("sequelize");
const db = require("../db");

const Song = db.define("Song", {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Song;
