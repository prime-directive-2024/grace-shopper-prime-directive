/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import albumsReducer from './albums';
import singleAlbum from './singleAlbum';
import cartReducer from './cart';

import ordersReducer from './orders';

import usersReducer from './userData';


const reducer = combineReducers({
  auth,
  albums: albumsReducer,
  singleAlbum,
  basket: cartReducer,

  orders: ordersReducer,

  users: usersReducer,

});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
