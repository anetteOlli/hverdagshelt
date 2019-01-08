// @flow
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

const userReducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      console.log('SIGN_IN_SUCCESS');
      return {
        loggedIn: true,
        token: action.token,
        errorMessage: ''
      };
    case 'SIGN_IN_ERROR':
      console.log('SIGN_IN_ERROR');
      return {
        loggedIn: true,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_UP_SUCCESS':
      console.log('SIGN_UP_SUCCESS');
      return {
        loggedIn: true,
        token: action.token,
        errorMessage: ''
      };
    case 'SIGN_UP_ERROR':
      console.log('SIGN_UP_ERROR');
      return {
        loggedIn: true,
        token: '',
        errorMessage: action.error.message
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('SIGN_OUT_SUCCESS');
      return {
        loggedIn: false,
        token: '',
        errorMessage: ''
      };
    case 'SIGN_OUT_ERROR':
      console.log('SIGN_OUT_ERORR');
      return {
        loggedIn: false,
        token: '',
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};

export default userReducer;
