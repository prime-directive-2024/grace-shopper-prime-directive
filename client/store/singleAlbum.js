/** @format */

import axios from 'axios';
import history from '../history';

//action type
const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM';
const DELETE_SINGLE_ALBUM = 'DELETE_SINGLE_ALBUM';

//action creator
const gotSingleAlbum = (album) => ({ type: GET_SINGLE_ALBUM, album });
const removeSingleAlbum = () => ({ type: GET_SINGLE_ALBUM });
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

export const deleteSingleAlbum = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/albums/${id}`, {
        headers: { authorization: token },
      });
      history.push('/home');
      dispatch(removeSingleAlbum());
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateSingleAlbum = (obj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`/api/albums/${obj.id}`, obj, {
        headers: { authorization: token },
      });
      console.log(data);
      dispatch(gotSingleAlbum(data));
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
    case DELETE_SINGLE_ALBUM:
      return {};
    default:
      return state;
  }
}
