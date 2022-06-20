/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../store/cart';
import { connect } from 'react-redux';
import axios from 'axios';

// const stripeCheckout = () => {};

const CheckOutButton = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    //STRIPE

    axios
      .post('/create-checkout-session', {
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 3 },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.ok) {
          console.log('POINTER');
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then(({ url }) => {
        console.log('hi');
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });

    //--STRIPE
    // dispatch(checkoutCart(props.userId, props.basket));
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
