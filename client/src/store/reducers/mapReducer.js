// @flow
export type State = {
  street: string,
  municipality: string,
  county: string,
  center: { lat: string, lng: string },
  currentMarker: { lat: string, lng: string }
};
export type Action =
  | { type: 'UPDATE_MAP', payload: { lat: string, lng: string } }
  | { type: 'UPDATE_CENTER', payload: { center: { lat: string, lng: string } } }
  | { type: 'UPDATE_PLACE_NAME', payload: { street: string, municipality: string, county: string, city: string } }
  | { type: 'UPDATE_STREET', payload: { street: string } };

const initState = {
  street: '',
  municipality: '',
  county: '',
  city: '',
  currentMarker: {
    lat: '',
    lng: ''
  },
  center: {
    lat: '63.42656212314987',
    lng: '10.393969503996345'
  }
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      console.log('%c UPDATE_MAP', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        currentMarker: action.payload
      };
    case 'UPDATE_CENTER':
      console.log('%c UPDATE_CENTER', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        center: action.payload
      };
    case 'UPDATE_STREET':
      console.log('%c UPDATE_CENTER', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        street: action.payload
      };
    case 'UPDATE_PLACE_NAME':
      console.log('%c UPDATE_PLACE_NAME', 'color: green; font-weight: bold;', action.payload);
      return {
        ...state,
        street: action.payload.street,
        municipality: action.payload.municipality,
        county: action.payload.county,
        city: action.payload.city
      };
    default:
      return state;
  }
};
