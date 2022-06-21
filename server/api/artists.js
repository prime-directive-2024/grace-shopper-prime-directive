/** @format */

const router = require('express').Router();
const {
  models: { Artist, Song, Album },
} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: [
        {
          model: Song,
        },
        {
          model: Album,
        },
      ],
    });
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({});
    res.json(artists);
  } catch (err) {
    next(err);
  }
});
