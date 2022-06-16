/** @format */

const router = require('express').Router();
const {
  models: { User, Album, Cart },
} = require('../db');
module.exports = router;

router.get('/basket/:id', async (req, res, next) => {
  try {
    //receives cartId & sends back all albums inside cart
    const id = req.params.id;
    const cart = await Cart.findByPk(id, {
      include: {
        model: Album,
      },
    });
    res.json(cart.Albums);
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    //receives cartId & albumId and adds item from cart
    const albumId = req.body.albumId;
    const cartId = req.body.cartId;
    const cart = await Cart.findByPk(cartId);
    await cart.addAlbum(albumId);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete', async (req, res, next) => {
  try {
    //receives cartId & albumId and deletes item from cart
    const albumId = req.body.albumId;
    const cartId = req.body.cartId;
    const cart = await Cart.findByPk(cartId);
    if (cart) {
      await cart.removeAlbum(albumId);
      res.sendStatus(200);
    } else {
      throw Error;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/delete-all', async (req, res, next) => {
  try {
    //Receives cartId and deletes entire cart
    const cartId = req.body.cartId;
    const cart = await Cart.findByPk(cartId);
    if (cart) {
      await cart.destroy();
      res.sendStatus(200);
    } else {
      throw Error;
    }
  } catch (error) {
    next();
  }
});

router.post('/checkout', async (req, res, next) => {
  try {
    //Receives cartId & userId and moves items from cart to orders then deletes all from cart.
    const userId = req.body.userId;
    const cartId = req.body.cartId;
    const user = await User.findByPk(userId);
    if (user) {
      //Maybe add payment logic here aswell
      await user.checkout(cartId);
      res.sendStatus(200);
    } else {
      throw Error;
    }
  } catch (error) {
    next();
  }
});
