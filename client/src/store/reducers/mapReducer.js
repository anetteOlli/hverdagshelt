// @flow
export type State = { lat: string, lng: string };
export type Action = { type: 'UPDATE_MAP', lat: string, lng: string };

const initState = {
  lat: '59.95',
  lng: '30.33',
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      console.log('UPDATE_MAP');
      console.log(action.lat, action.lng);
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    default:
      return state;
  }
};
