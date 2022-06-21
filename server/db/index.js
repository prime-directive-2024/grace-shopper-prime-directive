/** @format */
const db = require('./db');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Song = require('./models/Song');
const Order = require('./models/Order');
const AlbumOrder = require('./models/Album-Order');
const Cart = require('./models/Cart');
const AlbumCart = require('./models/Album-Cart');

Song.belongsTo(Album);
Song.belongsTo(Artist);

Artist.hasMany(Album);
Artist.hasMany(Song);

Album.belongsTo(Artist);
Album.hasMany(Song);

Order.belongsToMany(Album, { through: AlbumOrder });
Album.belongsToMany(Order, { through: AlbumOrder });

Order.belongsTo(User);
User.hasMany(Order);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsToMany(Album, { through: AlbumCart });
Album.belongsToMany(Cart, { through: AlbumCart });

module.exports = {
  db,
  models: {
    Song,
    Album,
    Artist,
    User,
    Order,
    Cart,
    AlbumCart,
    AlbumOrder,
  },
};
