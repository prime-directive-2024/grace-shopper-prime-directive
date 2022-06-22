/** @format */
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
const router = require('express').Router();
const {
  models: { Album, Artist, Song },
} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
        },
        {
          model: Song,
        },
      ],
    });

    res.json(album);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (album) {
      await Album.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } else {
      new Error("Album doesn't exist!");
      next(Error);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { title, price, genre, img_url } = req.body;
    const album = await Album.findByPk(req.params.id);
    if (album) {
      await album.update({ title, price, genre, img_url });
      const newAlbum = await Album.findByPk(req.params.id, {
        include: [
          {
            model: Artist,
          },
          {
            model: Song,
          },
        ],
      });
      res.send(newAlbum);
    } else {
      new Error("Album doesn't exist");
      next(Error);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      include: [
        {
          model: Artist,
        },
        {
          model: Song,
        },
      ],
    });
    res.json(albums);
  } catch (err) {
    next(err);
  }
});

router.post('/new-album', requireToken, isAdmin, async (req, res, next) => {
  try {
    const artist = await Artist.findOrCreate({
      where: {
        name: req.body.artist || 'Artist Unknown',
      },
    });
    const album = await Album.create({
      title: req.body.title,
      price: req.body.price || 420,
      img_url:
        req.body.img_url ||
        'https://www.hidethepainharold.com/assets/references/thumb/05.jpg',
      genre: req.body.genre || 'Rock',
    });
    // album.addArtist(id);
    console.log(artist);
    await artist[0].addAlbum(album);
    res.sendStatus(201);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Album already exists');
    } else {
      next(err);
    }
  }
});
