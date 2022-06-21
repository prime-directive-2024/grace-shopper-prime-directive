import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateCartItem } from '../../store/cart';

export default function SubtractOne(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (props.album.albumCart.quantity > 0) {
      const album = {
        ...props.album,
        albumCart: { quantity: props.album.albumCart.quantity - 1 },
      };
      dispatch(updateCartItem(album));
    }
  };
  return <button onClick={() => handleClick()}> - </button>;
}
