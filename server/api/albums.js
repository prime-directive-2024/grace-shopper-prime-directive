const router = require("express").Router();
const { models: { Album, Artist } } = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id, { include: "Songs" });
    const artist = await Artist.findByPk(album.ArtistId);
    album.dataValues.artist = artist;  // pre-optimized query returning 2 database calls as one
    res.json(album);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      attributes: ["id", "title"],
    });
    res.json(albums);
  } catch (err) {
    next(err);
  }
});
