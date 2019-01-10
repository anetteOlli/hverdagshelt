// @flow
export type State = {
  problems: {
    problem_id: number,
    problem_description: string,
    img_user: string,
    date_made: string,
    last_edited: string,
    location_fk: number,
    status_fk: number,
    category_fk: number
  }[],
  errorMessage: string
};

export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', error: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS' }
  | { type: 'EDIT_PROBLEM_ERROR', error: Error }
  | { type: 'DELETE_PROBLEM_SUCCESS' }
  | { type: 'DELETE_PROBLEM_ERROR', error: Error }
  | { type: 'PROBLEMS_BY_STATE_SUCCESS', problems: [] }
  | { type: 'PROBLEMS_BY_STATE_ERROR', error: Error }
  | { type: 'PROBLEM_BY_ID_SUCCESS', problems: [] }
  | { type: 'PROBLEM_BY_ID_ERROR', error: Error };

const initState = {
  problems: [
    {
      problem_id: -1,
      problem_description: '',
      img_user: '',
      date_made: '',
      last_edited: '',
      location_fk: -1,
      status_fk: -1,
      category_fk: -1
    }
  ],
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
    case 'PROBLEMS_BY_STATE_SUCCESS':
      console.log('GOT_PROBLEMS_BY_STATE_SUCCESS');
      return {
        problems: action.problems
      };
    case 'PROBLEMS_BY_STATE_ERROR':
      console.log('PROBLEMS_BY_STATE_ERROR');
      return {
        errorMessage: action.error.message
      };
    case 'PROBLEM_BY_ID_SUCCESS':
      console.log('PROBLEM_BY_ID_SUCCESS');
      return {
        problems: action.problems
      };
    case 'PROBLEM_BY_ID_ERROR':
      console.log('PROBLEM_BY_ID_ERROR');
      return {
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
