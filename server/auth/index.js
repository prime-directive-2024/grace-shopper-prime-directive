/** @format */

const router = require('express').Router();
const {
  models: { User, Cart },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate({
        username: req.body.username,
        password: req.body.password,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    user = await User.findByPk(user.id, {
      attributes: ['username', 'id', 'isAdmin'],
      include: {
        model: Cart,
      },
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
