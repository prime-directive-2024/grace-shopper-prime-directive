import React from 'react';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../store/cart';
//import function from store

export default function CheckOutButton(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log('Props in CHECKOUT BUTTON:', props);
    dispatch(checkoutCart(props));
  };
  return (
    <button className="checkoutButton" onClick={() => handleClick()}>
      Checkout Now
    </button>
  );
}
