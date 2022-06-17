/** @format */

const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/', requireToken, async (req, res, next) => {
  try {
    //You have to be logged in to get to this page
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
