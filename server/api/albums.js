const router = require("express").Router();
const {
  models: { Album, Artist, Song },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
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

router.get("/", async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      include: [{
        model: Artist,
      },
      {
        model: Song,
      }],
    });
    res.json(albums);
  } catch (err) {
    next(err);
  }
});
