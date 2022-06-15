const router = require("express").Router();
const {
  models: { Artist, Song, Album },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      attributes: ["id", "name", "img_url"],
      include: [
        {
          model: Song,
          attributes: ["id", "title"],
        },
        {
          model: Album,
          attributes: ["id", "title"],
        },
      ],
    });
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      attributes: ["id", "name", "img_url"],
    });
    res.json(artists);
  } catch (err) {
    next(err);
  }
});
