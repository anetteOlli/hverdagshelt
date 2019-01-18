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

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_SUCCESS':
      console.log('%c CREATE_CATEGORY_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'CREATE_CATEGORY_ERROR':
      console.log('%c CREATE_EVENT_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'DELETE_CATEGORY_SUCCESS':
      console.log('%c DELETE_CATEGORY_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'DELETE_CATEGORY_ERROR':
      console.log('%c DELETE_CATEGORY_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'GET_CATEGORIES_SUCCESS':
      console.log('%c GET_CATEGORIES_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        categories: (action.payload.map((c: { category: string }) => c.category): Array<string>)
      };
    case 'GET_CATEGORIES_ERROR':
      console.log('%c GET_CATEGORIES_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
