/** @format */

const router = require('express').Router();
const {
  models: { User, Album, Cart },
} = require('../db');
const AlbumCart = require('../db/models/Album-Cart');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/basket/:id', requireToken, async (req, res, next) => {
  try {
    //receives userId & sends back all albums inside cart
    const cartId = req.params.id;
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: Album,
      },
    });
    res.json(cart.Albums);
  } catch (error) {
    next(error);
  }
});

router.post('/add', requireToken, async (req, res, next) => {
  try {
    console.log('this ran?');
    //receives price, quantity, userId & albumId and adds item from cart
    const price = req.body.price;
    const qty = req.body.quantity;
    const albumId = req.body.albumId;
    const userId = req.user.id;
    const cart = await Cart.findAll({ where: { userId: userId } });
    const item = await cart[0].addAlbum(albumId);
    await item[0].update({ price: price, quantity: qty });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
router.put('/update', requireToken, async (req, res, next) => {
  try {
    //receives quantity, userId & albumId and updates quantity of item in cart
    console.log('this ran?');
    const qty = req.body.quantity;
    const AlbumId = req.body.albumId;
    const cartId = req.body.cartId;

    const cartItem = await AlbumCart.findAll({
      where: {
        cartId: cartId,
        AlbumId: AlbumId,
      },
    });
    if (cartItem) {
      await cartItem[0].update({ quantity: qty });
      res.sendStatus(200);
    } else {
      throw Error;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/delete', requireToken, async (req, res, next) => {
  try {
    //receives cartId & albumId and deletes item from cart
    console.log(req.body);
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

router.delete('/delete-all', requireToken, async (req, res, next) => {
  try {
    //Receives userId and deletes entire cart
    const cartId = req.body.cartId;
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: Album,
        },
      ],
    });
    if (cart) {
      await cart.removeAlbums(cart.Albums);
      res.sendStatus(200);
    } else {
      throw Error;
    }
  } catch (error) {
    next();
  }
});

router.post('/checkout', requireToken, async (req, res, next) => {
  try {
    //Receives userId and moves items from cart to orders then deletes all from cart.
    if (req.body.userId !== 1) {
      const userId = req.user.id;
      const user = await User.findByPk(userId, {
        include: {
          model: Cart,
        },
      });
      const cartId = user.carts[0].id;
      if (user) {
        //Maybe add payment logic here aswell

        await user.checkout(cartId);
        res.sendStatus(200);
      } else {
        throw Error;
      }
    } else if (req.body.userId === 1) {
      const user = await User.findByPk(1);
      console.log(req.body.order);
      user.guestCheckout(req.body.order);
      res.sendStatus(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    next();
  }
});
router.post('/guestCheckout', async (req, res, next) => {
  try {
    //Receives userId and moves items from cart to orders then deletes all from cart.
    if (req.body.userId === 1) {
      const user = await User.findByPk(1);
      console.log(req.body.order);
      user.guestCheckout(req.body.order);
      res.sendStatus(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    next();
  }
});
