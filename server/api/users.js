/** @format */

const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const Cart = require('../db/models/Cart');
const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username'],
      include: {
        model: Cart,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
