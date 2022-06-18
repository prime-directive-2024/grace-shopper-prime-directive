/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../store/cart';
import { connect } from 'react-redux';
//import function from store

const CheckOutButton = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(checkoutCart(props.userId, props.basket));
  };
  return (
    <button className='checkoutButton' onClick={() => handleClick()}>
      Checkout Now
    </button>
  );
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(CheckOutButton);
