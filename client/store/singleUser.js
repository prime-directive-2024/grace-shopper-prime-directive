import axios from 'axios';

//action
const GET_USER = 'GET_USER';

//creator
const gotUser = (user) => ({ type: GET_USER, user });

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

const initialState = {};
export default function singleUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
