const router = require("express").Router();
const {
  models: { Album, Song },
} = require("../db");
const Artist = require("../db/models/Artist");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      attributes: ["id", "title"],
      include: [
        {
          model: Artist,
          attributes: ["id", "name", "img_url"],
        },
        {
          model: Album,
          attributes: ["id", "title"],
        },
      ],
    });
    res.json(song);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.findAll({ attributes: ["id", "title"] });
    res.json(songs);
  } catch (err) {
    next(err);
  }
});
