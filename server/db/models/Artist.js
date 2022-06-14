const Sequelize = require("sequelize");
const db = require("../db");

const Artist = db.define("Artist", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  img_url: {
    type: Sequelize.STRING,
    defaultValue:
      "https://media.istockphoto.com/photos/rock-band-performing-in-a-studio-picture-id496120274?k=20&m=496120274&s=612x612&w=0&h=IT-grYLsW3YQRvkSjFGjOgdKarUnwc9gCKDULTOIuhk=",
  },
});

module.exports = Artist;
