/** @format */

import axios from 'axios';
import history from '../history';

//action type
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER';

//action creator
const setSingleOrder = (order) => ({ type: SET_SINGLE_ORDER, order });

//thunk
export const getSingleOrder = (id) => {
  return async (dispacth) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispacth(setSingleOrder(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//initial state
const initialState = {};
const singleOrder = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    default:
      return state;
  }
};
export default singleOrder;
