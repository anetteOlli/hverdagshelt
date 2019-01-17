// @flow
export type State = { isLoading: boolean, hasCheckedJWT: boolean };
export type Action = { type: 'SET_LOADING', payload: boolean } | { type: 'SET_CHECKED_JWT' };

const initState = {
  isLoading: false,
  hasCheckedJWT: false
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      console.log('%c SET_LOADING', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_CHECKED_JWT':
      console.log('%c SET_CHECKED_JWT', 'color: green; font-weight: bold;');
      return {
        ...state,
        hasCheckedJWT: true
      };
    default:
      return state;
  }
};