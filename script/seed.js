/** @format */

'use strict';
const names = [
  'Liam',
  'Noah',
  'Oliver',
  'Elijah',
  'James',
  'William',
  'Benjamin',
  'Lucas',
  'Henry',
  'Theodore',
  'Olivia',
  'Emma',
  'Charlotte',
  'Amelia',
  'Ava',
  'Sophia',
  'Isabella',
  'Mia',
  'Evelyn',
  'Harper',
];
const genre = [
  'Rock',
  'Jazz',
  'EDM',
  'Dubstep',
  'Techno',
  'R&B',
  'Country',
  'Pop',
];

const {
  db,
  models: { User, Artist, Album, Song, Order },
} = require('../server/db');
const AlbumOrder = require('../server/db/models/Album-Order');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  //testing function

  const seedArtists = async (names) => {
    for (let i = 0; i < 10; i++) {
      const artist = await Artist.create({ name: names[i] });
      const album = await Album.create({
        title: `${names[i]}'s Album`,
        price: Math.ceil(Math.random() * 35),
        genre: genre[Math.floor(Math.random() * 8)],
      });
      await artist.addAlbum(album);
      const numberOfSongs = Math.ceil(Math.random() * 10);
      for (let j = 0; j < numberOfSongs; j++) {
        const song = await Song.create({ title: `${names[i]}'s song ${j}` });
        await album.addSong(song);
        await artist.addSong(song);
      }
      const order = await Order.create();
      //order
      await users[1].addOrder(order.id);
      //order.addUser(user.id)
      const temp = await order.addAlbum(i);
      //const cartItem = album.addOrder(order)
      if (temp) {
        await temp[0].update({ price: i, quantity: i });
      }

      //cartItem.price += 10
      // cartItem.quantity += 1
    }
    const order = await AlbumOrder.findAll({ where: { OrderId: 2 } });
    return;
  };

  await seedArtists(names);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
