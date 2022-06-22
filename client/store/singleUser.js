/** @format */

import axios from 'axios';

//action
const GET_USER = 'GET_USER';
const UPDATE_MEMBER = 'UPDATE_MEMBER';
const CLEAR_USER = 'CLEAR_USER';

//creator
const gotUser = (user) => ({ type: GET_USER, user });
export const removeUser = (user) => ({ type: CLEAR_USER, user });
const updateMemberState = (member) => ({ type: UPDATE_MEMBER, member });
//thunk
export const getUser = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get('/api/users/my-profile', {
        headers: { authorization: token },
      });
      dispatch(gotUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put(
        '/api/users/my-profile/edit',
        { username: user.username, email: user.email },
        {
          headers: { authorization: token },
        }
      );
      dispatch(gotUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMember = (member) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put('/api/users/edit', member, {
        headers: {
          authorization: token,
        },
      });
      dispatch(updateMemberState(member));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {};
export default function singleUser(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER:
      return {};
    case GET_USER:
      return action.user;
    case UPDATE_MEMBER:
      return action.member;
    default:
      return state;
  }
}
