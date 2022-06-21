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
      const token = localStorage.getItem('token');
      if (token) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const { data } = await axios.get(`/api/cart/basket/${cartId}`, {
          headers: { authorization: token },
        });
        const combineCarts = [];
        if (cart.length > data.length) {
          for (let i = 0; i < cart.length; i++) {
            let notHere = true;
            for (let j = 0; j < data.length; j++) {
              if (cart[i] === data[j]) {
                notHere = false;
                break;
              }
            }
            if (notHere) {
              combineCarts.push(cart[i]);
            }
          }
        } else {
          for (let i = 0; i < data.length; i++) {
            let notHere = true;
            for (let j = 0; j < cart.length; j++) {
              if (data[i] === cart[j]) {
                notHere = false;
                break;
              }
            }
            if (notHere) {
              combineCarts.push(data[i]);
            }
          }
        }

        dispatch(setCartItems(combineCarts));
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
