// @flow
import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  problem: problemReducer,
  event: eventReducer
});

export default rootReducer;
