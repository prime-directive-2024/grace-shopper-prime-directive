/** @format */

import axios from 'axios';
import history from '../history';
//action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';

//action creators
const setCartItems = (items) => ({ type: GET_ALL_CART_ITEMS, items });

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

//state
const intiialState = [];

//reducer
const cartReducer = (state = intiialState, action) => {
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      return action.items;
    default:
      return state;
  }
};

export default cartReducer;
