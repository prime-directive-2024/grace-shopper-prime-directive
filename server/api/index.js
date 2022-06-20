/** @format */

const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/songs', require('./songs'));
router.use('/cart', require('./cart'));
router.use('/orders', require('./orders'));

router.post('/create-checkout-session', (req, res) => {
  res.json({ url: 'Hi from index' });
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
