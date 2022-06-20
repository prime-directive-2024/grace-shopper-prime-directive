const path = require('path');
const express = require('express');
const morgan = require('morgan');
//STRIPE modules
// require('dotenv').config();
// const cors = require('cors');
// const stripe = require('stripe')(
//   'sk_test_51LCD7cIP1PyDvJD7D3CiuXHJU4eRjNqXEAvDIscmZ802F6LGOzAqEtwsOrQtJjgB6jf09alhXzba3m9YMFCTWzzA00hsaKyDd1'
// );
// const uuid = require('uuid/v4');

const app = express();
module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
// app.use(cors());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
// //--------_STRIPE
// app.post('/checkout', async (req, res) => {
//   console.log('Request:', req.body);

//   let error;
//   let status;
//   try {
//     const { product, token } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const idempotency_key = uuid();
//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: 'usd',
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `Purchased the ${product.name}`,
//         shipping: {
//           name: token.card.name,
//           address: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.address_city,
//             country: token.card.address_country,
//             postal_code: token.card.address_zip,
//           },
//         },
//       },
//       {
//         idempotency_key,
//       }
//     );
//     console.log('Charge:', { charge });
//     status = 'success';
//   } catch (error) {
//     console.error('Error:', error);
//     status = 'failure';
//   }

//   res.json({ error, status });
// });
//-------------STRIPE

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
