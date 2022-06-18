/** @format */

import axios from 'axios';
import history from '../history';
//action types
const SET_ORDERS = 'SET_ORDERS';

//action creators
const setOrders = (orders) => ({ type: SET_ORDERS, orders });

//thunks
export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get('/api/orders', {
          headers: {
            authorization: token,
          },
        });
        console.log('ORDERS STORE', data);
        dispatch(setOrders(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
//state
const initialState = [];

//reducer
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
};

export default ordersReducer;
