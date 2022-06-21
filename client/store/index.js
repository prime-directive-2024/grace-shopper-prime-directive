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
import singleOrder from './singleOrder';
import usersReducer from './userData';
import singleUser from './singleUser';

const reducer = combineReducers({
  auth,
  albums: albumsReducer,
  singleAlbum,
  basket: cartReducer,
  orders: ordersReducer,
  singleOrder: singleOrder,
  users: usersReducer,
  singleUser,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
