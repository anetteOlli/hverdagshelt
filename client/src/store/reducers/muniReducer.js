// @flow
export type State = { municipalities: { municipality: string, county: string }[], errorMessage: string };
export type Action =
  | { type: 'GET_MUNICIPALITIES_SUCCESS', payload: { municipality: string, county: string }[] }
  | { type: 'GET_MUNICIPALITIES_ERROR', payload: Error }
  | { type: 'GET_COUNTIES_SUCCESS', payload: { county: string }[] }
  | { type: 'GET_COUNTIES_ERROR', payload: Error }
  | { type: 'GET_COUNTIES_BY_MUNI_SUCCESS', payload: { municipality: string }[] }
  | { type: 'GET_COUNTIES_BY_MUNI_ERROR', payload: Error };

const initState = {
  counties: [],
  municipalities: [],
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
    case 'GET_COUNTIES_SUCCESS':
      console.log('%c GET_COUNTIES_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        counties: action.payload.map(county => county.county)
      };
    case 'GET_COUNTIES_ERROR':
      console.log('%c GET_COUNTIES_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'GET_COUNTIES_BY_MUNI_SUCCESS':
      console.log('%c GET_COUNTIES_BY_MUNI_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        municipalities: action.payload
      };
    case 'GET_COUNTIES_BY_MUNI_ERROR':
      console.log('%c GET_COUNTIES_BY_MUNI_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
