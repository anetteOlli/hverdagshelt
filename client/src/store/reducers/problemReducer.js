// @flow
export type State = {
  problem_id: number,
  problem_description: string,
  img_user: string,
  date_made: string,
  last_edited: string,
  location_fk: number,
  status_fk: number,
  category_fk: number,
  errorMessage: string };
export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', error: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS' }
  | { type: 'EDIT_PROBLEM_ERROR', error: Error }
  | { type: 'DELETE_PROBLEM_SUCCESS' }
  | { type: 'DELETE_PROBLEM_ERROR', error: Error };

const initState = {
    problem_id: -1,
    problem_description: '',
    img_user: '',
    date_made: '',
    last_edited: '',
    location_fk: '',
    status_fk: '',
    category_fk: '',
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
