// @flow
export type State = { isLoading: boolean, };
export type Action = { type: 'SET_LOADING', payload: boolean }

const initState = {
  isLoading: false,
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'SET_LOADING':
      console.log('%c SET_LOADING', 'color: green; font-weight: bold;', action.payload);
      return {
        isLoading: action.payload,
      };
    default:
      return state;
  }
};