// @flow
export type State = { lat: string, lng: string };
export type Action = { type: 'UPDATE_MAP', lat: string, lng: string };

const initState = {
  lat: '',
  lng: ''
};

const mapReducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      console.log('UPDATE_MAP');
      return {
        lat: action.lat,
        lng: action.lng
      };
    default:
      return state;
  }
};

export default mapReducer;
