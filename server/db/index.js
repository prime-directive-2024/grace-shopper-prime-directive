/** @format */

//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Song = require('./models/Song');
const Order = require('./models/Order');
const AlbumOrder = require('./models/Album-Order');
//associations could go here!

//Song belongs to one album
Song.belongsTo(Album);
//Song belongs to one artist
Song.belongsTo(Artist);

//Artist has many albums
Artist.hasMany(Album);
//Artist has many songs
Artist.hasMany(Song);

//Album belongs to one Artist
Album.belongsTo(Artist);
//Album has many songs
Album.hasMany(Song);

Order.belongsToMany(Album, { through: AlbumOrder });
Album.belongsToMany(Order, { through: AlbumOrder });

//order belongs to user
Order.belongsTo(User);
//user has many orders
User.hasMany(Order);

module.exports = {
  db,
  models: {
    Song,
    Album,
    Artist,
    User,
    Order,
  },
};
