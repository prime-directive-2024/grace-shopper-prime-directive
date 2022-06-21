import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updateCartItem } from '../../store/cart';

export default function AddOne(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(props.album);
    const album = {
      ...props.album,
      albumCart: { quantity: props.album.albumCart.quantity + 1 },
    };
    console.log(album);
    dispatch(updateCartItem(album));
  };
  return <button onClick={() => handleClick()}> + </button>;
}
