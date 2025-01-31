// @flow
export type State = {
  municipalities: { municipality: string, county: string }[],
  counties: string[],
  currentMunicipalities: string[],
  errorMessage: string
};
export type Action =
  | { type: 'GET_MUNICIPALITIES_SUCCESS', payload: { municipality: string, county: string }[] }
  | { type: 'GET_MUNICIPALITIES_ERROR', payload: Error }
  | { type: 'GET_COUNTIES_SUCCESS', payload: { name: string }[] }
  | { type: 'GET_COUNTIES_ERROR', payload: Error }
  | { type: 'GET_COUNTIES_BY_MUNI_SUCCESS', payload: { municipality: string }[] }
  | { type: 'GET_COUNTIES_BY_MUNI_ERROR', payload: Error };

const initState = {
  counties: [],
  municipalities: [],
  currentMunicipalities: [],
  errorMessage: ''
};

/**
 * The muniReducer stores the redux state of municipalities.
 * @param state Current state of the muniReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns the updated state of the muniReducer.
 */
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
        counties: (action.payload.map((county: { name: string }) => county.name): Array<string>)
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
        currentMunicipalities: (action.payload.map(
          (municipality: { municipality: string }) => municipality.municipality
        ): Array<string>)
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
