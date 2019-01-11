// @flow
export type State = { categories: string[], errorMessage: string };
export type Action =
  | { type: 'CREATE_CATEGORY_SUCCESS' }
  | { type: 'CREATE_CATEGORY_ERROR', error: Error }
  | { type: 'DELETE_CATEGORY_SUCCESS' }
  | { type: 'DELETE_CATEGORY_ERROR', error: Error }
  | { type: 'GET_CATEGORIES_SUCCESS', categories: string[] }
  | { type: 'GET_CATEGORIES_ERROR', error: Error };

const initState = {
  categories: [],
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_SUCCESS':
      console.log('%c CREATE_CATEGORY_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'CREATE_CATEGORY_ERROR':
      console.log('%c CREATE_EVENT_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    case 'DELETE_CATEGORY_SUCCESS':
      console.log('%c DELETE_CATEGORY_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'DELETE_CATEGORY_ERROR':
      console.log('%c DELETE_CATEGORY_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    case 'GET_CATEGORIES_SUCCESS':
      console.log('%c GET_CATEGORIES_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        categories: action.categories
      };
    case 'GET_CATEGORIES_ERROR':
      console.log('%c GET_CATEGORIES_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
