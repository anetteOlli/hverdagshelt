// @flow
type Problem = {
  problem_id: number,
  problem_title: string,
  problem_description: string,
  problem_locked: number,
  img_user: string,
  date_made: string,
  last_edited: string,
  location_fk: string,
  status_fk: string,
  category_fk: string
};

export type State = {
  problems: Problem[],
  errorMessage: string
};

export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', error: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS' }
  | { type: 'EDIT_PROBLEM_ERROR', error: Error }
  | { type: 'DELETE_PROBLEM_SUCCESS' }
  | { type: 'DELETE_PROBLEM_ERROR', error: Error }
  | { type: 'PROBLEM_BY_ID_SUCCESS', problems: Problem }
  | { type: 'PROBLEM_BY_ID_ERROR', error: Error }
  | { type: 'PROBLEMS_BY_MUNI_SUCCESS', problems: Problem[] }
  | { type: 'PROBLEMS_BY_MUNI_ERROR', error: Error }
  | { type: 'PROBLEMS_BY_STREET_SUCCESS', problems: Problem[] }
  | { type: 'PROBLEMS_BY_STREET_ERROR', error: Error };

const initState = {
  problems: [
    {
      problem_id: 1,
      problem_title: 'Hull i veien',
      problem_description: 'Dette er krise kom og fiks!',
      problem_locked: 0,
      img_user: 'https://i.imgur.com/ykbz8hO.png',
      date_made: '20-13-2018',
      last_edited: '20-14-2018',
      location_fk: 'Eplegaten 2',
      status_fk: 'Fixed',
      category_fk: 'Vei og kjørebane'
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
      console.log('%c DELETE_PROBLEM_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    case 'PROBLEMS_BY_MUNI_SUCCESS':
      console.log('%c PROBLEMS_BY_STATE_SUCCESS', 'color: green; font-weight: bold;', action.problems);
      return {
        ...state,
        problems: action.problems
      };
    case 'PROBLEMS_BY_MUNI_ERROR':
      console.log('%c PROBLEMS_BY_STATE_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    case 'PROBLEMS_BY_STREET_SUCCESS':
      console.log('%c PROBLEMS_BY_STREET_SUCCESS', 'color: green; font-weight: bold;', action.problems);
      return {
        ...state,
        problems: action.problems
      };
    case 'PROBLEMS_BY_STREET_ERROR':
      console.log('%c PROBLEMS_BY_STREET_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        ...state,
        errorMessage: action.error.message
      };
    case 'PROBLEM_BY_ID_SUCCESS':
      console.log('%c PROBLEM_BY_ID_SUCCESS', 'color: green; font-weight: bold;', action.problems);
      return {
        ...state,
        problems: action.problems
      };
    case 'PROBLEM_BY_ID_ERROR':
      console.log('%c PROBLEM_BY_ID_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
