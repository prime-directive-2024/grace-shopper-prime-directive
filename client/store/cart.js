/** @format */

import axios from 'axios';
import history from '../history';
//action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const DELETE_CART = 'DELETE_CART';
const CHECKOUT = 'CHECKOUT';
const UPDATE_CART = 'UPDATE_CART';

//action creators
const setCartItems = (items) => ({ type: GET_ALL_CART_ITEMS, items });
const addToCart = (item) => ({ type: ADD_TO_CART, item });
const removedFromCart = (albumId) => ({ type: REMOVE_FROM_CART, albumId });
const deleteCart = (cartId) => ({ type: DELETE_CART, cartId });
const checkout = () => ({ type: CHECKOUT });
const updateCart = (item) => ({ type: UPDATE_CART, item });

//thunks

export const getAllCartItems = (cartId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/cart/basket/${cartId}`, {
        headers: { authorization: token },
      });
      dispatch(setCartItems(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addItemToCart = (album, reduxAlbum) => {
  return async (dispatch) => {
    try {
      if (reduxAlbum) {
        const token = localStorage.getItem('token');
        await axios.post(`/api/cart/add`, album, {
          headers: { authorization: token },
        });
        dispatch(addToCart(reduxAlbum));
      } else {
        console.log(album);
        dispatch(addToCart(album));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFromCart = (cart) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (cart.cartId) {
        await axios.delete('/api/cart/delete', {
          headers: { authorization: token },
          data: cart,
        });
      }
      dispatch(removedFromCart(cart.albumId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAllFromCart = (cartId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (cartId.cartId) {
        await axios.delete('/api/cart/delete-all', {
          headers: { authorization: token },
          data: cartId,
        });
      }

      dispatch(deleteCart(cartId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const checkoutCart = (userId, order) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (userId) {
        await axios.post(
          '/api/cart/checkout',
          {},
          {
            headers: { authorization: token },
          }
        );
      } else {
        await axios.post('/api/cart/guestCheckout', { userId: 1, order });
      }

      dispatch(checkout());
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (album) => {
  return async (dispatch) => {
    try {
      if (album.userId) {
        await axios.put('/api/cart/update', album);
      }
      dispatch(updateCart(album));
    } catch (error) {
      console.error(error);
    }
  };
};

//state
const initialState = [];

//reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      return action.items;
    case ADD_TO_CART:
      return [...state, action.item];
    case REMOVE_FROM_CART:
      return state.filter((album) => album.id !== action.albumId);
    case DELETE_CART:
      return [];
    case CHECKOUT:
      return [];
    case UPDATE_CART: {
      const removed = state.filter((album) => album.id !== action.albumId);
      return [...removed, action.item];
    }
    default:
      return state;
  }
};

export default cartReducer;
