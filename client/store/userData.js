import axios from 'axios';

//action
const IS_ADMIN = 'IS_ADMIN';

//action creator
const isAdmin = (users) => ({ type: IS_ADMIN, users });

//thunk
export const isAdminCheck = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get('/api/users', {
        headers: { authorization: token },
      });
      dispatch(isAdmin(data));
    } catch (err) {
      dispatch(isAdmin('error'));
      console.error(err);
    }
  };
};

//reducer
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case IS_ADMIN:
      return action.users.sort((a, b) => a.id - b.id);
    default:
      return state;
  }
}
