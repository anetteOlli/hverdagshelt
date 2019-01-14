// @flow
import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  app: appReducer,
  user: userReducer,
  problems: problemReducer,
  events: eventReducer,
  map: mapReducer,
  categories: categoryReducer
});
