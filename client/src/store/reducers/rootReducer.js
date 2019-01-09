// @flow
import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  user: userReducer,
  problem: problemReducer,
  event: eventReducer,
  form: formReducer
});

export default rootReducer;
