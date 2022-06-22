/** @format */

import axios from 'axios';
import { useDispatch } from 'react-redux';
import history from '../history';
import { addItemToCart } from './cart';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
/**
 * THUNK CREATORS
 */
export const me = (cart) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        console.log(cart[i]);
        dispatch(addItemToCart(cart[i]));
      }
      console.log(addItemToCart);
      window.localStorage.removeItem('cart');
      window.localStorage.setItem('cart', JSON.stringify([]));
    }

    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method, email, cart) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me(cart));
      history.push('/home');
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem('cart');
  window.localStorage.setItem('cart', JSON.stringify([]));
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
