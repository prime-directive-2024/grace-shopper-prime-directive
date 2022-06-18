/** @format */

import axios from 'axios';
import history from '../history';
//action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const DELETE_CART = 'DELETE_CART';
const CHECKOUT = 'CHECKOUT';

//action creators
const setCartItems = (items) => ({ type: GET_ALL_CART_ITEMS, items });
const addToCart = (item) => ({ type: ADD_TO_CART, item });
const removedFromCart = (albumId) => ({ type: REMOVE_FROM_CART, albumId });
const deleteCart = (cartId) => ({ type: DELETE_CART, cartId });
const checkout = () => ({ type: CHECKOUT });

//thunks
export const getAllCartItems = (cartId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/basket/${cartId}`);
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
        await axios.post(`/api/cart/add`, album);
        dispatch(addToCart(reduxAlbum));
      } else {
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
      if (cart.cartId) {
        await axios.delete('/api/cart/delete', {
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
      if (cartId.cartId) {
        await axios.delete('/api/cart/delete-all', {
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
      if (userId) {
        await axios.post('/api/cart/checkout', userId);
      } else {
        await axios.post('/api/cart/checkout', { userId: 1, order });
      }

      dispatch(checkout());
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
    default:
      return state;
  }
};

export default cartReducer;
