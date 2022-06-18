/** @format */

import axios from 'axios';
import history from '../history';

//action type
const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM';

//action creator
const gotSingleAlbum = (album) => ({ type: GET_SINGLE_ALBUM, album });

//thunk
export const getSingleAlbum = (id) => {
  return async (dispacth) => {
    try {
      const { data } = await axios.get(`/api/albums/${id}`);
      dispacth(gotSingleAlbum(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//initial state
const initialState = {};
export default function singleAlbum(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ALBUM:
      return action.album;
    default:
      return state;
  }
}
