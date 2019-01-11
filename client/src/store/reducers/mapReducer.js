// @flow
export type State = { lat: string, lng: string };
export type Action =
  | { type: 'UPDATE_MAP', lat: string, lng: string }
  | { type: 'UPDATE_CENTER', lat: string, lng: string }
  | { type: 'UPDATE_PLACE_NAME', street: string, municipality: string }
  | { type: 'UPDATE_STREET', street: string };

const initState = {
  streetname: '',
  municipality: '',
  county: '',
  lat: '',
  lng: '',
  center: {
    lat: '',
    lng: ''
  }
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      console.log('%c UPDATE_MAP', 'color: green; font-weight: bold;', action);
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    case 'UPDATE_CENTER':
      console.log('%c UPDATE_CENTER', 'color: green; font-weight: bold;', action);
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
        center: {
          lat: action.lat,
          lng: action.lng
        }
      };
    case 'UPDATE_STREET':
      console.log('%c UPDATE_CENTER', 'color: green; font-weight: bold;', action);
      return {
        ...state,
        streetname: action.street
      };
    case 'UPDATE_PLACE_NAME':
      console.log('%c UPDATE_PLACE_NAME', 'color: green; font-weight: bold;', action);
      return {
        ...state,
        streetname: action.street,
        county: action.county,
        municipality: action.municipality
      };
    default:
      return state;
  }
};
