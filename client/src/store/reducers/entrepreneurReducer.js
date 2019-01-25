export type State = {};
export type Action = { type: 'ENTREPRENEUR_GET_ALL_SUCCESS' } | { type: 'ENTREPRENEUR_GET_ALL_ERROR', payload: Error };

const initState = {
  entrepreneurs: [],
  currentEntrepreneur: '',
  errorMessage: ''
};

/**
 * The entrepreneurReducer stores the redux state of entrepreneurs.
 * @param state Current state of the entrepreneurReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the entrepreneurReducer.
 */

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'ENTREPRENEUR_GET_BY_MUNI_SUCCESS':
      console.log('%c ENTREPRENEUR_GET_BY_MUNI_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        entrepreneurs: action.payload
      };
    case 'ENTREPRENEUR_GET_BY_MUNI_ERROR':
      console.log('%c ENTREPRENEUR_GET_BY_MUNI_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'ENTREPRENEUR_GET_FROM_user_id_SUCCESS':
      console.log('%c ENTREPRENEUR_GET_FROM_user_id_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        currentEntrepreneur: action.payload
      };
    case 'ENTREPRENEUR_GET_FROM_user_id_ERROR':
      console.log('%c ENTREPRENEUR_GET_FROM_user_id_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };

    case 'ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_SUCCESS':
      console.log(
        '%c ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_SUCCESS',
        'color: green; font-weight: bold;',
        action.payload
      );
      return {
        entrepreneurs: action.payload
      };
    case 'ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_ERROR':
      console.log('%c ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_ERROR', 'color: green; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'ENTREPRENEUR_GET_FROM_entrepreneur_id_SUCCESS':
      console.log('%c ENTREPRENEUR_GET_FROM_entrepreneur_id_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        currentEntrepreneur: action.payload
      };
    case 'ENTREPRENEUR_GET_FROM_entrepreneur_id_ERROR':
      console.log('%c ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_ERROR', 'color: green; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
