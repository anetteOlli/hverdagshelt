// @flow
export type State = { errorMessage: string };
export type Action =
  | { type: 'CREATE_EVENT_SUCCESS' }
  | { type: 'CREATE_EVENT_ERROR', error: Error }
  | { type: 'EDIT_EVENT_SUCCESS' }
  | { type: 'EDIT_EVENT_ERROR', error: Error }
  | { type: 'DELETE_EVENT_SUCCESS' }
  | { type: 'DELETE_EVENT_ERROR', error: Error };

const initState = {
  errorMessage: ''
};

const eventReducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_EVENT_SUCCESS':
      console.log('CREATE_EVENT_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'CREATE_EVENT_ERROR':
      console.log('CREATE_EVENT_ERROR');
      return {
        errorMessage: action.error.message
      };
    case 'EDIT_EVENT_SUCCESS':
      console.log('EDIT_EVENT_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'EDIT_EVENT_ERROR':
      console.log('EDIT_EVENT_ERROR');
      return {
        errorMessage: action.error.message
      };
    case 'DELETE_EVENT_SUCCESS':
      console.log('DELETE_EVENT_SUCCESS');
      return {
        errorMessage: ''
      };
    case 'DELETE_EVENT_ERROR':
      console.log('CREATE_EVENT_ERROR');
      return {
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};

export default eventReducer;
