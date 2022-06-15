const router = require("express").Router();
const {
  models: { Album, Artist, Song },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      attributes: ["id", "title", "price", "img_url", "genre"],
      include: [
        {
          model: Artist,
          attributes: ["id", "name", "img_url"],
        },
        {
          model: Song,
          attributes: ["id", "title"],
        },
      ],
    });

    res.json(album);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      attributes: ["title", "price", "img_url", "genre"],
      include: {
        model: Artist,
        attributes: ["name", "img_url"],
      },
    });
    res.json(albums);
  } catch (err) {
    next(err);
  }
});
