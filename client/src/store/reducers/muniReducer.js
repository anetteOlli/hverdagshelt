// @flow
export type State = { municipalities: string[], errorMessage: string };
export type Action =
  | { type: 'GET_MUNICIPALITIES_SUCCESS', payload: string[] }
  | { type: 'GET_MUNICIPALITIES_ERROR', payload: Error };

const initState = {
  municipalities: ['Test', 'test2'],
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'GET_MUNICIPALITIES_SUCCESS':
      console.log('%c GET_MUNICIPALITIES_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        municipalities: action.payload
      };
    case 'GET_MUNICIPALITIES_ERROR':
      console.log('%c GET_MUNICIPALITIES_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
