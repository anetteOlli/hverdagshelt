// @flow
export type State = { isLoading: boolean, checkedJWT: boolean };
export type Action = { type: 'SET_LOADING', payload: boolean } | { type: 'CHECKED_JWT' };

const initState = {
  isLoading: false,
  checkedJWT: false
};

/**
 * The asynReducer stores the redux state if the app is loading or has checked the jwt token.
 * @param state Current state of the asyncReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the asyncReducer.
 */

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
