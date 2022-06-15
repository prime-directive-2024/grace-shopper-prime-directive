import axios from 'axios';
import history from '../history';

//Action type
const GET_ALL_ALBUMS = 'GET_ALL_ALBUMS';

//Action creators

const gotAllAlbums = (albums) => ({ type: GET_ALL_ALBUMS, albums });

//Thunk

export const getAllAlbums = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/albums');
      dispatch(gotAllAlbums(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const intiialState = [];

//reducer
export default function albumsReducer(state = intiialState, action) {
  switch (action.type) {
    case GET_ALL_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}
