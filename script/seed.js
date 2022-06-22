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
  'ABBA',
  'AC/DC',
  'Aerosmith',
  'The Allman Brothers Band',
  'Amadou and Mariam',
  'The Andrews Sisters',
  'The Animals',
  'Arcade Fire',
  'The Band',
  'The Beach Boys',
  'The Beastie Boys',
  'The Beatles',
  'The Bee Gees',
  'Big Star',
  'Black Flag',
  'Black Sabbath',
  'Blondie',
  'Booker T. and the MG’s',
  'Boston',
  'The Boswell Sisters',
  'Boyz II Men',
  'Brooks & Dunn',
  'Buffalo Springfield',
  'The Byrds',
  'Calle 13',
  'The Chemical Brothers',
  'Chicago',
  'The Clash',
  'The Coasters',
  'Coldplay',
  'Alice Cooper',
  'Cream',
  'Creedence Clearwater Revival',
  'Crosby, Stills & Nash',
  'Daft Punk',
  'De La Soul',
  'Death Cab for Cutie',
  'The Decemberists',
  'Def Leppard',
  'Devo',
  'The Dillards',
  'Dion and the Belmonts',
  'Dire Straits',
  'Dixie Chicks',
  'The Doors',
  'The Drifters',
  'The Eagles',
  'Earth, Wind & Fire',
  'Emerson Lake & Palmer',
  'The Everly Brothers',
  'The Flamingos',
  'Fleetwood Mac',
  'The Flying Burrito Brothers',
  'The Four Seasons',
  'The Four Tops',
  'Fugazi',
  'The Gang of Four',
  'Genesis',
  'Grandmaster Flash and the Furious Five',
  'The Grateful Dead',
  'Green Day',
  'Guns N’ Roses',
  'Hüsker Dü',
  'The Hollies',
  'Iggy and the Stooges',
  'The Ink Spots',
  'The Isley Brothers',
  'The Jam',
  'The Jefferson Airplane',
  'The Jesus and Mary Chain',
  'Jonas Brothers',
  'Joy Division',
  'The Judds',
  'The Kingston Trio',
  'The Kinks',
  'Gladys Knight and the Pips',
  'Kool and the Gang',
  'Kraftwerk',
  'Ladysmith Black Mambazo',
  'Led Zeppelin',
  'Little Anthony and the Imperials',
  'The Louvin Brothers',
  'Love',
  'The Lovin’ Spoonful',
  'Frankie Lymon and the Teenagers',
  'Lynyrd Skynyrd',
  'The MC5',
  'The Mamas and the Papas',
  'The Mekons',
  'Metallica',
  'The Mills Brothers',
  'Modest Mouse',
  'The Monkees',
  'The Moody Blues',
  'The Moonglows',
  'Mumford & Sons',
  'My Chemical Romance',
  'New Order',
  'The New York Dolls',
  'Nine Inch Nails',
  'Nirvana',
  'The O’Jays',
  'The Ohio Players',
  'One Direction',
  'The Orioles',
  'OutKast',
  'Parliament-Funkadelic',
  'Pavement',
  'Pearl Jam',
  'Pere Ubu',
  'The Pet Shop Boys',
  'Peter, Paul and Mary',
  'Pink Floyd',
  'Pixies',
  'The Platters',
  'Poco',
  'The Police',
  'Portishead',
  'Public Enemy',
  'Puffy AmiYumi',
  'Queen',
  'R.E.M.',
  'Radiohead',
  'Rage Against the Machine',
  'The Ramones',
  'Rascal Flatts',
  'Red Hot Chili Peppers',
  'The Replacements',
  'The Rolling Stones',
  'Roxy Music',
  'Run-D.M.C.',
  'Sam and Dave',
  'Santana',
  'The Sex Pistols',
  'The Shadows',
  'The Shirelles',
  'Sleater-Kinney',
  'Sly and the Family Stone',
  'Smashing Pumpkins',
  'The Smiths',
  'Sonic Youth',
  'The Soul Stirrers',
  'Spice Girls',
  'Stanley Brothers',
  'The Staple Singers',
  'Steely Dan',
  'The Strokes',
  'TV on the Radio',
  'Talking Heads',
  'Television',
  'The Temptations',
  'Tinariwen',
  'Toots and the Maytals',
  'Traffic',
  'The Turtles',
  'U2',
  'Van Halen',
  'The Velvet Underground',
  'The Ventures',
  'The Weavers',
  'The White Stripes',
  'The Who',
  'Wilco',
  'X',
  'The Yardbirds',
  'Yes',
  'Yo La Tengo',
  'ZZ Top',
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
const userNames = [
  // 'GUEST',
  // 'cody',
  'murphy',
  'Samuel',
  'Ethan',
  'Logan',
  'Owen',
  'Jacob',
  'Asher',
  'Aiden',
  'John',
  'Joseph',
  'Wyatt',
  'David',
  'Leo',
  'Luke',
  'Julian',
  'Hudson',
  'Grayson',
  'Matthew',
  'Ezra',
  'Gabriel',
  'Carter',
  'Isaac',
  'Jayden',
  'Luca',
  'Anthony',
  'Dylan',
  'Lincoln',
  'Thomas',
  'Maverick',
  'Elias',
  'Josiah',
  'Charles',
  'Caleb',
  'Christopher',
  'Ezekiel',
  'Miles',
  'Jaxon',
  'Isaiah',
  'Andrew',
  'Joshua',
  'Nathan',
  'Nolan',
  'Adrian',
  'Cameron',
  'Santiago',
  'Eli',
  'Aaron',
  'Ryan',
  'Angel',
  'Cooper',
  'Waylon',
  'Easton',
  'Kai',
  'Christian',
  'Landon',
  'Colton',
  'Roman',
  'Axel',
  'Brooks',
  'Jonathan',
  'Robert',
  'Jameson',
  'Ian',
  'Everett',
  'Greyson',
  'Wesley',
  'Jeremiah',
  'Everly',
  'Lillian',
  'Paisley',
  'Elena',
  'Naomi',
  'Maya',
  'Natalie',
  'Kinsley',
  'Delilah',
  'Claire',
  'Audrey',
  'Aaliyah',
  'Ruby',
  'Brooklyn',
  'Alice',
  'Aubrey',
  'Autumn',
  'Leilani',
  'Savannah',
  'Valentina',
  'Kennedy',
  'Madelyn',
  'Josephine',
  'Bella',
  'Skylar',
  'Genesis',
  'Sophie',
  'Hailey',
  'Sadie',
  'Natalia',
  'Quinn',
  'Caroline',
  'Allison',
  'Gabriella',
  'Anna',
  'Daisy',
  'Alina',
  'Lucia',
  'Ximena',
  'Juniper',
  'Kaylee',
  'Magnolia',
  'Summer',
  'Adalyn',
  'Sloane',
  'Amara',
  'Arianna',
  'Isabel',
  'Reese',
  'Emersyn',
  'Sienna',
  'Kehlani',
  'River',
  'Freya',
  'Valerie',
  'Blakely',
  'Genevieve',
  'Esther',
];

const {
  db,
  models: { User, Artist, Album, Song },
} = require('../server/db');
const Cart = require('../server/db/models/Cart');

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const users = [];
  const guest = await User.create({ username: 'GUEST', password: '123' });

  const cody = await User.create({
    username: 'cody',
    password: '123',
    isAdmin: true,
  });

  users.push(guest);
  users.push(cody);
  for (let i = 0; i < userNames.length; i++) {
    const email = i * 2 + '.420@gmail.com';
    const user = await User.create({
      username: userNames[i],
      password: '123',
      email: email,
    });
    users.push(user);
  }

  const seedArtists = async (names) => {
    for (let i = 0; i < names.length; i++) {
      let genreNum = 0;
      const artist = await Artist.create({ name: names[i] });
      const album = await Album.create({
        title: `${names[i]}'s Album`,
        price: Math.ceil((i + 1) * 2 * 100),
        genre: genre[parseInt(i % 8)],
      });

      await artist.addAlbum(album);
      const numberOfSongs = 10;
      for (let j = 0; j < numberOfSongs; j++) {
        const song = await Song.create({ title: `${names[i]}'s song ${j}` });
        await album.addSong(song);
        await artist.addSong(song);
      }
    }
  };
  await seedArtists(names);

  for (let i = 2; i < userNames.length; i++) {
    const cart = await Cart.findAll({
      where: {
        userId: users[i].id,
      },
    });
    for (let j = 1; j < 8; j++) {
      const temp = await cart[0].addAlbum(j);
      const album = await Album.findByPk(temp[0].AlbumId);
      if (album) {
        await temp[0].update({ price: album.price, quantity: i + 1 });
      }
    }
  }
  for (let i = 2; i < userNames.length / 2; i++) {
    const cart = await Cart.findAll({
      where: {
        userId: users[i].id,
      },
    });
    await users[i].checkout(cart[0].id);
    for (let j = 1; j < 8; j++) {
      const temp = await cart[0].addAlbum(j);
      const album = await Album.findByPk(temp[0].AlbumId);
      if (album) {
        await temp[0].update({ price: album.price, quantity: i + 1 });
      }
    }
    //   await users[i].checkout(cart.id);
  }

  // const order = await AlbumOrder.findAll({ where: { OrderId: 2 } });

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
