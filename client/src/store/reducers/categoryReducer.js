// @flow
export type State = { categories: string[], errorMessage: string };
export type Action =
  | { type: 'CREATE_CATEGORY_SUCCESS' }
  | { type: 'CREATE_CATEGORY_ERROR', payload: Error }
  | { type: 'DELETE_CATEGORY_SUCCESS' }
  | { type: 'DELETE_CATEGORY_ERROR', payload: Error }
  | { type: 'GET_CATEGORIES_SUCCESS', payload: { category: string }[] }
  | { type: 'GET_CATEGORIES_ERROR', payload: Error };

const initState = {
  categories: [],
  errorMessage: ''
};

/**
 * The categoryReducer stores the redux state of categories.
 * @param state Current state of the categoryReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the categoryReducer.
 */
export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'CREATE_CATEGORY_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'DELETE_CATEGORY_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: (action.payload.map((c: { category: string }) => c.category): Array<string>)
      };
    case 'GET_CATEGORIES_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
