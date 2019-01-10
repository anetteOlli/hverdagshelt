// @flow
import { setToken, clearToken } from '../util';
export type State = { token: string, isLoggedIn: boolean, errorMessage: string };
export type Action =
  | { type: 'SIGN_IN_SUCCESS', token: string }
  | { type: 'SIGN_IN_ERROR', error: Error }
  | { type: 'SIGN_OUT_SUCCESS' }
  | { type: 'SIGN_OUT_ERROR', error: Error }
  | { type: 'SIGN_UP_SUCCESS', token: string }
  | { type: 'SIGN_UP_ERROR', error: Error };

const initState = {
  token: '',
  isLoggedIn: false,
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      console.log('SIGN_IN_SUCCESS');
      setToken(action.token);
      return {
        isLoggedIn: true,
        token: action.token,
        errorMessage: 'WRONG EMAIL'
      };
    case 'SIGN_IN_ERROR':
      console.log('SIGN_IN_ERROR');
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_UP_SUCCESS':
      console.log('SIGN_UP_SUCCESS');
      setToken(action.token);
      return {
        isLoggedIn: true,
        token: action.token,
        errorMessage: ''
      };
    case 'SIGN_UP_ERROR':
      console.log('SIGN_UP_ERROR');
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('SIGN_OUT_SUCCESS');
      clearToken();
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: ''
      };
    case 'SIGN_OUT_ERROR':
      console.log('SIGN_OUT_ERORR');
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
