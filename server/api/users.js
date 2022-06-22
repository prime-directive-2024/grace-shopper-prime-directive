/** @format */

const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/my-profile', requireToken, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.put('/my-profile/edit', requireToken, async (req, res, next) => {
  try {
    const updated = await req.user.update({
      username: req.body.username,
      email: req.body.email,
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.put('/edit', requireToken, isAdmin, async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findByPk(req.body.userId);
    const updated = await user.update({
      username: req.body.username,
      email: req.body.email,
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
});
