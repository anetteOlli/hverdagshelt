import userReducer from './userReducer';
import categoryReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer
});

export default rootReducer;
