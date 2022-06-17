/** @format */

import axios from 'axios';
import history from '../history';
//action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';
const ADD_TO_CART = 'ADD_TO_CART';
//action creators
const setCartItems = (items) => ({ type: GET_ALL_CART_ITEMS, items });
const addToCart = (item) => ({ type: ADD_TO_CART, item });

//thunks
export const getAllCartItems = (cartId) => {
  return async (dispatch) => {
    try {
      //await axios.get(`/api/cart/basket/${cartId}, {userId:id}`
      const { data } = await axios.get(`/api/cart/basket/${cartId}`);
      dispatch(setCartItems(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemToCart = (album, reduxAlbum) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/cart/add`, album);
      dispatch(addToCart(reduxAlbum));
    } catch (error) {
      console.log(error);
    }
  };
};

//state
const intialState = [];

//reducer
const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      return action.items;
    case ADD_TO_CART:
      return [...state, action.item];
    default:
      return state;
  }
};

export default cartReducer;
