/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../store/cart';
import { connect } from 'react-redux';
//import function from store

// const stripeCheckout = () => {
//   fetch('/create-checkout-session', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       items: [
//         { id: 1, quantity: 2 },
//         { id: 2, quantity: 3 },
//       ],
//     }),
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//       return res.json().then((json) => Promise.reject(json));
//     })
//     .then(({ url }) => (window.location = url));
// };

const CheckOutButton = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    // stripeCheckout();
    dispatch(checkoutCart(props.userId, props.basket));
  };
  return (
    <button className="checkoutButton" onClick={() => handleClick()}>
      Checkout Now
    </button>
  );
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(CheckOutButton);
