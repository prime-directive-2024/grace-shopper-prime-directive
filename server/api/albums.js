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

router.delete('/:id', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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
