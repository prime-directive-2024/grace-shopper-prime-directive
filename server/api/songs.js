const router = require("express").Router();
const { models: { Album, Song } } = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    const album = await Album.findByPk(song.AlbumId);
    song.dataValues.album = album;   // pre-optimized query returning 2 database calls as one
    res.json(song);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (err) {
    next(err);
  }
});
