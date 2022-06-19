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
    //You have to be logged in to get to this page
    //You also have to be an admin to view all
    const users = await User.findAll({
      attributes: ['id', 'username'],
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
