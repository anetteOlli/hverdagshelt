// @flow
export type State = { lat: string, lng: string };
export type Action = { type: 'UPDATE_MAP', lat: string, lng: string };

const initState = {
  lat: '',
  lng: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      console.log('%c UPDATE_MAP', 'color: green; font-weight: bold;', action);
      return {
        lat: action.lat,
        lng: action.lng
      };
    default:
      return state;
  }
};
