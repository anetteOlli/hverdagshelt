// @flow
import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';
import categoryReducer from './categoryReducer';

import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  problems: problemReducer,
  events: eventReducer,
  map: mapReducer,
  categories: categoryReducer
});
