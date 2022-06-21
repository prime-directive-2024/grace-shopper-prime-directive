/** @format */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../store/cart';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import { toast } from 'react-toastify';

// toast.configure();

const CheckOutButton = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log('PROPERTIES:', props);
  const product = {
    name: 'Jamazon purchase',
    price: props.total,
  };
  console.log('TOTAl in pennies:', product.price);
  async function handleToken(token) {
    setIsLoading(true);
    // console.log({ token, addresses });
    const response = await axios.post(
      'https://vdw2id.sse.codesandbox.io/checkout',
      { token, product }
    );
    const { status } = response.data;
    if (status === 'success') {
      // toast('Success! Check email for more details', { type: 'success' });
      dispatch(checkoutCart(props.auth.id, props.basket));
      alert('Thank you for your purchase!');
      setIsLoading();
    } else {
      // toast('Somethign went wrong'), { type: 'error' };
      alert('something went wrong');
      setIsLoading(false);
    }
  }

  // const handleClick = () => {};
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
        // onClick={() => handleClick()}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(CheckOutButton);
