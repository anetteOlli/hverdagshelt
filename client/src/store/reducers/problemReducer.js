// @flow
export type Problem = {
  problem_id: number,
  problem_title: string,
  problem_description: string,
  problem_locked: number,
  img_user: string,
  img_entrepreneur: string,
  date_made: string,
  county_fk: string,
  municipality_fk: string,
  city_fk: string,
  street_fk: string,
  last_edited: string,
  status_fk: string,
  category_fk: string,
  support: number
};

export type State = {
  problems: Problem[],
  errorMessage: string
};

export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', payload: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS' }
  | { type: 'EDIT_PROBLEM_ERROR', payload: Error }
  | { type: 'DELETE_PROBLEM_SUCCESS' }
  | { type: 'DELETE_PROBLEM_ERROR', payload: Error }
  | { type: 'PROBLEM_BY_ID_SUCCESS', payload: Problem }
  | { type: 'PROBLEM_BY_ID_ERROR', payload: Error }
  | { type: 'PROBLEMS_BY_MUNI_SUCCESS', payload: Problem[] }
  | { type: 'PROBLEMS_BY_MUNI_ERROR', payload: Error }
  | { type: 'PROBLEMS_BY_STREET_SUCCESS', payload: Problem[] }
  | { type: 'PROBLEMS_BY_STREET_ERROR', payload: Error }
  | { type: 'GO_TO_PROBLEM_DETAIL', payload: number }
  | { type: 'GO_TO_PROBLEM_EDIT', payload: number };

const initState = {
  problems: [
    {
      problem_id: 2,
      problem_title: 'Hull i veien',
      problem_description: 'Dette er krise kom og fiks!',
      problem_locked: 0,
      img_user: 'https://i.imgur.com/ykbz8hO.png',
      img_entrepreneur: 'https://i.imgur.com/ykbz8hO.png',
      date_made: '20-13-2018',
      last_edited: '20-14-2018',
      status_fk: 'Fixed',
      category_fk: 'Vei og kjørebane',
      county_fk: 'test',
      municipality_fk: 'test',
      city_fk: 'test',
      street_fk: 'test',
      latitude: '63.42656212314987',
      longitude: '10.393969503996345',
      support: -1
    }
  ],
  errorMessage: '',
  currentProblemId: 2,
  editMode: false
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_SUCCESS':
      console.log('%c CREATE_PROBLEM_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'CREATE_PROBLEM_ERROR':
      console.log('%c CREATE_PROBLEM_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'EDIT_PROBLEM_SUCCESS':
      console.log('%c EDIT_PROBLEM_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'EDIT_PROBLEM_ERROR':
      console.log('%c EDIT_PROBLEM_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'DELETE_PROBLEM_SUCCESS':
      console.log('%c DELETE_PROBLEM_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'DELETE_PROBLEM_ERROR':
      console.log('%c DELETE_PROBLEM_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_MUNI_SUCCESS':
      console.log('%c PROBLEMS_BY_MUNI_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_MUNI_ERROR':
      console.log('%c PROBLEMS_BY_MUNI_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_STREET_SUCCESS':
      console.log('%c PROBLEMS_BY_STREET_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_STREET_ERROR':
      console.log('%c PROBLEMS_BY_STREET_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEM_BY_ID_SUCCESS':
      console.log('%c PROBLEM_BY_ID_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEM_BY_ID_ERROR':
      console.log('%c PROBLEM_BY_ID_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'GO_TO_PROBLEM_DETAIL':
      console.log('%c GO_TO_PROBLEM_DETAIL', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        currentProblemId: action.payload,
        editMode: false
      };
    case 'GO_TO_PROBLEM_EDIT':
      console.log('%c GO_TO_PROBLEM_EDIT', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        currentProblemId: action.payload,
        editMode: true
      };
    case 'SUPPORT_PROBLEM_SUCCESS':
      console.log('%c SUPPORT_PROBLEM_SUCCESS', 'color: green; font-weight: bold;') ;
      return {
        ...state,
        errorMessage: ''
      };
    case 'SUPPORT_PROBLEM_ERROR':
      console.log('%c SUPPORT_PROBLEM_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
