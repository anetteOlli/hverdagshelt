// @flow
export type State = { token: string, isLoggedIn: boolean, errorMessage: string };
export type Action =
  | { type: 'SIGN_IN_SUCCESS', token: string }
  | { type: 'SIGN_IN_ERROR', error: Error }
  | { type: 'SIGN_OUT_SUCCESS' }
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
      console.log('%c SIGN_IN_SUCCESS', 'color: green; font-weight: bold;');
      return {
        isLoggedIn: true,
        token: action.token,
        errorMessage: 'WRONG EMAIL'
      };
    case 'SIGN_IN_ERROR':
      console.log('%c SIGN_IN_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_UP_SUCCESS':
      console.log('%c SIGN_UP_SUCCESS', 'color: green; font-weight: bold;');
      return {
        isLoggedIn: true,
        token: action.token,
        errorMessage: ''
      };
    case 'SIGN_UP_ERROR':
      console.log('%c SIGN_UP_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('%c SIGN_OUT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        isLoggedIn: false,
        token: '',
        errorMessage: ''
      };
    default:
      return state;
  }
};