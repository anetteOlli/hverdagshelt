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
  category: string,
  status: string,
  user_id: number,
  entrepreneur_id: number,
  latitude: number,
  longitude: number,
  support: number,
  municipality: string,
  county: string,
  city: string,
  street: string
};

export type State = {
  problems: Problem[],
  errorMessage: string,
  currentMuni: { municipality: string, county: string }
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
  | { type: 'PROBLEMS_BY_ADMINISTRATOR_USER_SUCCESS', payload: Problem[] }
  | { type: 'PROBLEMS_BY_ADMINISTRATOR_USER_ERROR', payload: Error }
  | { type: 'PROBLEMS_BY_STANDARD_USER_SUCCESS', payload: Problem[] }
  | { type: 'PROBLEMS_BY_STANDARD_USER_ERROR', payload: Error }
  | { type: 'PROBLEMS_BY_ENTREPRENEUR_USER_SUCCESS', payload: Problem[] }
  | { type: 'PROBLEMS_BY_ENTREPRENEUR_USER_ERROR', payload: Error };

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
      category: 'Snowplow',
      status: 'Unchecked',
      user_id: 1,
      entrepreneur_id: null,
      latitude: 63.422724,
      longitude: 10.395582,
      support: 1,
      municipality: 'Trondheim',
      county: 'Trøndelag',
      city: 'Trondheim',
      street: 'Klostergata'
    }
  ],
  errorMessage: '',
  currentProblemId: 2,
  editMode: false,
  currentMuni: { municipality: '', county: '' }
};

/**
 * The problemReducer stores the redux state of all the problems in the app.
 * @param state Current state of the problemReducer.
 * @param action The action contains the type and payload to update the state.
 * @returns The updated state of the problemReducer.
 */
export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'CREATE_PROBLEM_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'EDIT_PROBLEM_SUCCESS':
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
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'DELETE_PROBLEM_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'DELETE_PROBLEM_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_MUNICIPALITY_USER_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_MUNICIPALITY_USER_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_MUNI_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_MUNI_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEMS_BY_STANDARD_USER_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_STANDARD_USER_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };

    case 'PROBLEMS_BY_ENTREPRENEUR_USER_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_ENTREPRENEUR_USER_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };

    case 'PROBLEMS_BY_ADMINISTRATOR_USER_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_ADMINISTRATOR_USER_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };

    case 'PROBLEMS_BY_STREET_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEMS_BY_STREET_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEM_BY_ID_SUCCESS':
      return {
        ...state,
        problems: action.payload
      };
    case 'PROBLEM_BY_ID_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'GO_TO_PROBLEM_DETAIL':
      return {
        ...state,
        currentProblemId: action.payload,
        editMode: false
      };
    case 'GO_TO_PROBLEM_EDIT':
      return {
        ...state,
        currentProblemId: action.payload,
        editMode: true
      };
    case 'SUPPORT_PROBLEM_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'SUPPORT_PROBLEM_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'PROBLEM_ADD_ENTREPRENEUR_SUCCESS':
      return {
        ...state,
        errorMessage: ''
      };
    case 'PROBLEM_ADD_ENTREPRENEUR_ERROR':
      return {
        ...state,
        errorMessage: action.payload.message
      };
    case 'SET_MUNI':
      return {
        ...state,
        currentMuni: action.payload,
        errorMessage: ''
      };
    default:
      return state;
  }
};
