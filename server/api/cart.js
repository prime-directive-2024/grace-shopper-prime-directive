const router = require("express").Router();
const {
  models: { User, Album },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username"],
      include: {
        model: Album,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
