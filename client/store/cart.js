/** @format */

import axios from 'axios';
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
export const deleteCart = (cartId) => ({ type: DELETE_CART, cartId });
const checkout = () => ({ type: CHECKOUT });
const updateCart = (item) => ({ type: UPDATE_CART, item });

//thunks

export const getAllCartItems = (cartId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        let { data } = await axios.get(`/api/cart/basket/${cartId}`, {
          headers: { authorization: token },
        });

        dispatch(setCartItems(data));
      } else {
        const cart = JSON.parse(localStorage.getItem('cart'));

        dispatch(setCartItems(cart));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addItemToCart = (album) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`/api/cart/add`, album, {
          headers: { authorization: token },
        });
        dispatch(addToCart(album));
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(album);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(addToCart(album));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFromCart = (cartId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[0]) {
          cart = cart.filter((album) => album.id !== cartId.albumId);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        await axios.delete('/api/cart/delete', {
          headers: { authorization: token },
          data: cartId,
        });
        dispatch(removedFromCart(cartId.albumId));
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart.filter((album) => album.id !== cartId.albumId);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(removedFromCart(cartId.albumId));
      }
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
        localStorage.setItem('cart', JSON.stringify([]));
        await axios.delete('/api/cart/delete-all', {
          headers: { authorization: token },
          data: cartId,
        });
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
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
        localStorage.setItem('cart', JSON.stringify([]));
      }
      localStorage.setItem('cart', JSON.stringify([]));
      dispatch(checkout());
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (album) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put('/api/cart/update', album, {
          headers: { authorization: token },
        });
        dispatch(updateCart(album));
      } else {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart.filter((item) => item.id !== album.id);
        cart.push(album);
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(updateCart(album));
      }
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
      // const removed = state.filter((album) => album.id !== action.item.id);
      // return [...removed, action.item];
      const Albums = state.map((album) =>
        album.id !== action.item.id ? album : action.item
      );
      return Albums;
    }
    default:
      return state;
  }
};

export default cartReducer;
