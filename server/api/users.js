const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: "Albums",
      attributes: ["id", "username"],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
