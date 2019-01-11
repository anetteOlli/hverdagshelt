// @flow
type Event = {
  event_id: number,
  event_description: string
};

export type State = { events: Event[], errorMessage: string };
export type Action =
  | { type: 'CREATE_EVENT_SUCCESS' }
  | { type: 'CREATE_EVENT_ERROR', error: Error }
  | { type: 'EDIT_EVENT_SUCCESS' }
  | { type: 'EDIT_EVENT_ERROR', error: Error }
  | { type: 'DELETE_EVENT_SUCCESS' }
  | { type: 'DELETE_EVENT_ERROR', error: Error };

const initState = {
  events: [
    {
      event_id: -1,
      event_description: ''
    }
  ],
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'CREATE_EVENT_SUCCESS':
      console.log('%c CREATE_EVENT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        errorMessage: ''
      };
    case 'CREATE_EVENT_ERROR':
      console.log('%c CREATE_EVENT_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        errorMessage: action.error.message
      };
    case 'EDIT_EVENT_SUCCESS':
      console.log('%c EDIT_EVENT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        errorMessage: ''
      };
    case 'EDIT_EVENT_ERROR':
      console.log('%c EDIT_EVENT_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        errorMessage: action.error.message
      };
    case 'DELETE_EVENT_SUCCESS':
      console.log('%c DELETE_EVENT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        errorMessage: ''
      };
    case 'DELETE_EVENT_ERROR':
      console.log('%c DELETE_EVENT_ERROR', 'color: red; font-weight: bold;', action.error);
      return {
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
