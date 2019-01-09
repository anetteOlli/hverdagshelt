// @flow
export type State = { errorMessage: string };
export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', error: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS' }
  | { type: 'EDIT_PROBLEM_ERROR', error: Error }
  | { type: 'DELETE_PROBLEM_SUCCESS' }
  | { type: 'DELETE_PROBLEM_ERROR', error: Error };

const initState = {
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_SUCCESS':
      console.log('CREATE_PROBLEM_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'CREATE_PROBLEM_ERROR':
      console.log('CREATE_PROBLEM_ERROR');
      return {
        errorMessage: action.error.message
      };
    case 'EDIT_PROBLEM_SUCCESS':
      console.log('EDIT_PROBLEM_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'EDIT_PROBLEM_ERROR':
      console.log('EDIT_PROBLEM_ERROR');
      return {
        errorMessage: action.error.message
      };
    case 'DELETE_PROBLEM_SUCCESS':
      console.log('DELETE_PROBLEM_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'DELETE_PROBLEM_ERROR':
      console.log('CREATE_PROBLEM_ERROR');
      return {
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};