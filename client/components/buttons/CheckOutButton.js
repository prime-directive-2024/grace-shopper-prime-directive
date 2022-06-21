/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../store/cart';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const CheckOutButton = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const product = {
    name: 'Jamazon purchase',
    price: props.total,
  };

  async function handleToken(token) {
    setIsLoading(true);

    const response = await axios.post(
      'https://vdw2id.sse.codesandbox.io/checkout',
      { token, product }
    );
    const { status } = response.data;
    if (status === 'success') {
      dispatch(checkoutCart(props.auth.id, props.basket));
      alert('Thank you for your purchase!');
      setIsLoading();
    } else {
      alert('something went wrong');
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? (
        <img
          className="loading"
          src="https://wallpaperaccess.com/full/2439067.gif"
        />
      ) : (
        <></>
      )}
      <StripeCheckout
        stripeKey="pk_test_51LCD7cIP1PyDvJD7Q5f5q9yvGzqFcBzoWJX4Zmsi63rMQvhYxZrYqYSyppHOcsOSoRfpP5zGb8c68HDRBeSg8WzP004HdLEQkR"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={props.total * 100}
        className="checkoutButton"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(CheckOutButton);
