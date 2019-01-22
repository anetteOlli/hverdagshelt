// @flow
export type Problem = {
  problem_id: number,
  problem_title: string,
  problem_description: string,
  problem_locked: number,
  description_entrepreneur: string,
  img_user: string,
  img_entrepreneur: string,
  date_made: date,
  last_edited: date,
  date_finished: date,
  category_fk: string,
  status_fk: string,
  user_fk: number,
  entrepreneur_fk: number,
  latitude: number,
  longitude: number,
  support: number,
  municipality_fk: string,
  county_fk: string,
  city_fk: string,
  street_fk: string
};

export type State = {
  problems: Problem[],
  errorMessage: string,
  currentMuni: {municipality_fk: string, county_fk: string}
};

export type Action =
  | { type: 'CREATE_PROBLEM_SUCCESS' }
  | { type: 'CREATE_PROBLEM_ERROR', payload: Error }
  | { type: 'EDIT_PROBLEM_SUCCESS', payload: Problem }
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
  | { type: 'GO_TO_PROBLEM_EDIT', payload: number }
  | { type: 'PROBLEM_ADD_ENTREPRENEUR_SUCCESS' }
  | { type: 'PROBLEM_ADD_ENTREPRENEUR_ERROR' }
  | { type: 'SET_MUNI', payload: any };


const initState = {
  problems: [
    {
      problem_id: 1,
      problem_title: 'Erlend tried his best',
      problem_description: 'A big hole has been found in the rear of Erlend',
      problem_locked: 0,
      description_entrepreneur: null,
      img_user:
        'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/37032713_1777400872353121_1971277099943591936_n.jpg?_nc_cat=111&_nc_ht=scontent-arn2-1.xx&oh=dbdfebda96c80ead5e55f1e45587efba&oe=5CBFFCF5',
      img_entrepreneur: null,
      date_made: '2019-01-16 11:43:39',
      last_edited: '2019-01-17 10:17:16',
      date_finished: null,
      category_fk: 'Snowplow',
      status_fk: 'Unchecked',
      user_fk: 1,
      entrepreneur_fk: null,
      latitude: 63.422724,
      longitude: 10.395582,
      support: 1,
      municipality_fk: 'Trondheim',
      county_fk: 'Trøndelag',
      city_fk: 'Trondheim',
      street_fk: 'Klostergata'
    }
  ],
  errorMessage: '',
  currentProblemId: 2,
  editMode: false,
  currentMuni: {municipality: '', county: ''}
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
      console.log('%c EDIT_PROBLEM_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: state.problems.map((problem: Problem) => {
          if (problem.problem_id === action.payload.problem_id) {
            return action.payload;
          } else {
            return problem;
          }
        }),
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
    case 'PROBLEMS_BY_MUNICIPALITY_USER_SUCCESS':
      console.log('%c PROBLEMS_BY_MUNICIPALITY_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_MUNICIPALITY_USER_ERROR':
      console.log('%c PROBLEMS_BY_MUNICIPALITY_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_STANDARD_USER_SUCCESS':
      console.log('%c PROBLEMS_BY_STANDARD_USER_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_STANDARD_USER_ERROR':
      console.log('%c PROBLEMS_BY__STANDARD_USER_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };

    case 'PROBLEMS_BY_ENTREPRENEUR_USER_SUCCESS':
      console.log('%c PROBLEMS_BY_ENTREPRENEUR_USER_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_ENTREPRENEUR_USER_ERROR':
      console.log('%c PROBLEMS_BY_ENTREPRENEUR_USER_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        ...state,
        errorMessage: action.payload.message
      };

    case 'PROBLEMS_BY_ADMINISTRATOR_USER_SUCCESS':
      console.log('%c PROBLEMS_BY_ADMINISTRATOR_USER_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_ADMINISTRATOR_USER_ERROR':
      console.log('%c PROBLEMS_BY_ADMINISTRATOR_USER_ERROR', 'color: red; font-weight: bold;', action.payload);
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
      console.log('%c SUPPORT_PROBLEM_SUCCESS', 'color: green; font-weight: bold;');
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
    case 'PROBLEM_ADD_ENTREPRENEUR_SUCCESS':
      console.log('%c PROBLEM_ADD_ENTREPRENEUR_SUCCESS', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: ''
      };
    case 'PROBLEM_ADD_ENTREPRENEUR_ERROR':
      console.log('%c PROBLEM_ADD_ENTREPRENEUR_ERROR', 'color: green; font-weight: bold;');
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'SET_MUNI':
      console.log('%c SET_MUNI', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        currentMuni: action.payload,
        errorMessage: ''
      };
    default:
      return state;
  }
};
