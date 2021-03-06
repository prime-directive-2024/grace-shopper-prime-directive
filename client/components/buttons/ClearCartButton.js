import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllFromCart } from '../../store/cart';

export default function DeleteCart(props) {
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(deleteAllFromCart(props));
    // Here is where we add our mapped dispactch from props
    // dispatch(/* */ props);
  };
  return (
    <button
      style={{ marginTop: '50px', marginLeft: '20px' }}
      onClick={() => {
        handleClear();
      }}
    >
      Clear out cart
    </button>
  );
}
