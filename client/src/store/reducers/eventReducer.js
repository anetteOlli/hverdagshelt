// @flow
type Event = {
  event_id: number,
  event_name: string,
  event_description: string,
  event_img: string,
  date_starting: Date,
  date_ending: Date,
  status_fk: '',
  county_fk: '',
  municipality_fk: '',
  city_fk: '',
  street_fk: ''
};

export type State = { events: Event[], errorMessage: string };
export type Action =
  | { type: 'CREATE_EVENT_SUCCESS' }
  | { type: 'CREATE_EVENT_ERROR', payload: Error }
  | { type: 'EDIT_EVENT_SUCCESS' }
  | { type: 'EDIT_EVENT_ERROR', payload: Error }
  | { type: 'DELETE_EVENT_SUCCESS' }
  | { type: 'DELETE_EVENT_ERROR', payload: Error }
  | { type: 'EVENTS_BY_ALL_SUCCESS', payload: Event[] }
  | { type: 'EVENTS_BY_ALL_ERROR', payload: Error }
  | { type: 'EVENTS_BY_MUNI_SUCCESS', payload: Event[] }
  | { type: 'EVENTS_BY_MUNI_ERROR', payload: Error };

const initState = {
  events: [
    {
      event_id: -1,
      event_name: '',
      municipality_fk: '',
      event_description: '',
      event_img: '',
      date_starting: new Date(),
      date_ending: new Date(),
      status_fk: '',
      county_fk: '',
      city_fk: '',
      street_fk: ''
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
      console.log('%c CREATE_EVENT_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'EDIT_EVENT_SUCCESS':
      console.log('%c EDIT_EVENT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        errorMessage: ''
      };
    case 'EDIT_EVENT_ERROR':
      console.log('%c EDIT_EVENT_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'DELETE_EVENT_SUCCESS':
      console.log('%c DELETE_EVENT_SUCCESS', 'color: green; font-weight: bold;');
      return {
        errorMessage: ''
      };
    case 'DELETE_EVENT_ERROR':
      console.log('%c DELETE_EVENT_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'EVENTS_BY_ALL_SUCCESS':
      console.log('%c EVENTS_BY_ALL_SUCCESS', 'color: red; font-weight: bold;', action.payload);
      return {
        events: action.payload
      };
    case 'EVENTS_BY_ALL_ERROR':
      console.log('%c EVENTS_BY_ALL_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    case 'EVENTS_BY_MUNI_SUCCESS':
      console.log('%c EVENTS_BY_MUNI_SUCCESS', 'color: red; font-weight: bold;', action.payload);
      return {
        events: action.payload
      };
    case 'EVENTS_BY_MUNI_ERROR':
      console.log('%c EVENTS_BY_ALL_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
