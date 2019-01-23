// @flow
export type State = { isLoading: boolean };
export type Action = { type: 'SET_LOADING', payload: boolean } | { type: 'CHECKED_JWT' };

const initState = {
  isLoading: false,
  checkedJWT: false
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'CHECKED_JWT':
      return {
        ...state,
        checkedJWT: true
      };
    default:
      return state;
  }
};
