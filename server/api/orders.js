/** @format */

const router = require('express').Router();
const {
  models: { Album, Order, User },
} = require('../db');
const AlbumOrder = require('../db/models/Album-Order');

const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    let orders = await User.findByPk(req.user.id, {
      include: {
        model: Order,
      },
    });
    if (orders.Orders[0]) {
      orders = await Order.findByPk(orders.Orders[0].id, {
        include: {
          model: Album,
        },
      });
    }
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Album,
      },
    });
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Album,
      },
    });
    if (order) {
      order.destroy();
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
