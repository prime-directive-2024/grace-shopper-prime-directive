/** @format */

const router = require('express').Router();
const {
  models: { Album, Order, User },
} = require('../db');

const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    let orders = await User.findByPk(req.user.id, {
      include: {
        model: Order,
      },
    });
    let allOrders = [];
    for (let i = 0; i < orders.Orders.length; i++) {
      if (orders.Orders[i]) {
        const order = await Order.findByPk(orders.Orders[i].id, {
          include: {
            model: Album,
          },
        });
        allOrders.push(order);
      }
    }

    res.json(allOrders);
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
    if (order.userId !== req.user.id) {
      res.sendStatus(401);
    }
    if (order) {
      order.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});
