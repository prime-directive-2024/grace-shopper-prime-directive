/** @format */

const router = require('express').Router();
const {
  models: { User, Album, Cart },
} = require('../db');
const AlbumCart = require('../db/models/Album-Cart');
const Artist = require('../db/models/Artist');
const Song = require('../db/models/Song');
const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/basket/:id', requireToken, async (req, res, next) => {
  try {
    const cartId = req.user.id;
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: Album,
        include: [
          {
            model: Song,
          },
          {
            model: Artist,
          },
        ],
      },
    });

    res.json(cart.Albums);
  } catch (error) {
    next(error);
  }
});

router.post('/add', requireToken, async (req, res, next) => {
  try {
    const price = req.body.price;
    const qty = req.body.albumCart.quantity;
    const albumId = req.body.id;
    const userId = req.user.id;
    console.log(req.body);
    const cart = await Cart.findAll({ where: { userId: userId } });
    const item = await cart[0].addAlbum(albumId);
    console.log(item);
    await item[0].update({ price: price, quantity: qty });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
router.put('/update', requireToken, async (req, res, next) => {
  try {
    console.log('UPDATE ROUTE', req.body);
    const qty = req.body.albumCart.quantity;
    const AlbumId = req.body.id;
    // vvvv This is a tempory security measure. It currently works because every user only has 1 cart, in the future when we implement a buy now feature this will have to change.
    const cartId = req.user.id;
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
    const albumId = req.body.albumId;
    // vvvv This is a tempory security measure. It currently works because every user only has 1 cart, in the future when we implement a buy now feature this will have to change.
    const cartId = req.user.id;
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
    // vvvv This is a tempory security measure. It currently works because every user only has 1 cart, in the future when we implement a buy now feature this will have to change.
    const cartId = req.user.id;
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
    if (req.body.userId !== 1) {
      const userId = req.user.id;
      const user = await User.findByPk(userId, {
        include: {
          model: Cart,
        },
      });
      const cartId = user.carts[0].id;
      if (user) {
        await user.checkout(cartId);
        res.sendStatus(200);
      } else {
        throw Error;
      }
    } else if (req.body.userId === 1) {
      const user = await User.findByPk(1);
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
    if (req.body.userId === 1) {
      const user = await User.findByPk(1);
      user.guestCheckout(req.body.order);
      res.sendStatus(200);
    } else {
      throw new Error();
    }
  } catch (error) {
    next();
  }
});
