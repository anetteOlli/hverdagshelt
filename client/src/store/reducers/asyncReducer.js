// @flow
export type State = { isLoading: boolean };
export type Action =
  | { type: 'SET_LOADING', payload: boolean }

const initState = {
  isLoading: false
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        isLoading: action.payload
      };
    default:
      return state;
  }
};
