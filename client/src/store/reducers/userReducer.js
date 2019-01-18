// @flow

export type Priority = 'Standard' | 'Municipality' | 'Entrepreneur' | 'Administrator';

export type State = {
  userID: number,
  isLoggedIn: boolean,
  errorMessage: string,
  priority: Priority
};

export type Action =
  | { type: 'SIGN_IN_SUCCESS', payload: { userId: number, priority: Priority } }
  | { type: 'SIGN_IN_ERROR', payload: Error }
  | { type: 'SIGN_OUT_SUCCESS' }
  | { type: 'SIGN_UP_SUCCESS' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SIGN_UP_ERROR', payload: Error }
  | { type: 'REFRESH_SUCCESS', payload: { userId: number, priority: Priority } }
  | { type: 'REFRESH_ERROR', payload: string }
  | { type: 'TEMP_PASSWORD_SUCCESS' }
  | { type: 'TEMP_PASSWORD_ERROR', payload: Error };

const initState = {
  userID: 0,
  isLoggedIn: false,
  errorMessage: '',
  priority: 'Municipality'
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      console.log('%c SIGN_IN_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        isLoggedIn: true,
        priority: action.payload.priority,
        userID: action.payload.userId,
        errorMessage: ''
      };
    case 'SIGN_IN_ERROR':
      console.log('%c SIGN_IN_ERROR', 'color: red; font-weight: bold;', action.payload.message);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'SIGN_UP_SUCCESS':
      console.log('%c SIGN_UP_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'SIGN_UP_ERROR':
      console.log('%c SIGN_UP_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('%c SIGN_OUT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        isLoggedIn: false,
        userID: 0,
        errorMessage: ''
      };
    case 'REFRESH_SUCCESS':
      console.log('%c REFRESH_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        isLoggedIn: true,
        userID: action.payload.userId,
        priority: action.payload.priority,
        errorMessage: ''
      };
    case 'REFRESH_ERROR':
      console.log('%c REFRESH_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: ''
      };
    case 'CLEAR_ERROR':
      console.log('%c REFRESH_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'TEMP_PASSWORD_SUCCESS':
      console.log('%c TEMP_PASSWORD_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'TEMP_PASSWORD_ERROR':
      console.log('%c TEMP_PASSWORD_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
