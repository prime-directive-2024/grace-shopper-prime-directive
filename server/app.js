// require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
//STRIPE modules
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

//STRIPE ROUTE
const storeItems = new Map([
  [1, { priceInCents: 1000, name: 'Learn React' }],
  [2, { priceInCents: 2000, name: 'Learn CSS today' }],
]);

app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('@@@@@@@@@@@@@@@@', req.headers);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html}`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html}`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.sendStatus(500).json({ error: error.message });
  }
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
