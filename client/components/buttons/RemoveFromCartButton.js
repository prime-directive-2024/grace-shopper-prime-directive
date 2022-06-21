/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cart';

export default function RemoveFromCartButton(props) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    // Here is where we add our mapped dispactch from props
    dispatch(removeFromCart(props));
  };
  return (
    <button
      onClick={() => {
        handleDelete();
      }}
    >
      X
    </button>
  );
}
