const Sequelize = require("sequelize");
const db = require("../db");

const Album = db.define("Album", {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    price: {
      type: Sequelize.NUMBER,
      defaultValue: 0,
    },
    img_url: {
      type: Sequelize.STRING,
      defaultValue:
        "https://www.hidethepainharold.com/assets/references/thumb/05.jpg",
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [
          ["Rock", "Jazz", "EDM", "Dubstep", "Techno", "R&B", "Country", "Pop"],
        ],
      },
    },
  },
});

module.exports = Album;
