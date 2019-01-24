// @flow
import type { Action } from '../reducers/mapReducer';
import type { ReduxState } from '../reducers';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

//
export const updateMap = (lat: string, lng: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_MAP',
      payload: {
        lat: lat,
        lng: lng
      }
    });
  };
};

export const updateMarker = (lat: string, lng: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_MAP',
      payload: {
        lat: lat,
        lng: lng
      }
    });
  };
};
export const changeCenter = (lat: string, lng: string) => {
  console.log('....data');
  const center = { lat, lng };
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_CENTER',
      payload: { center }
    });
  };
};

export const changePlaceName = (street: string, municipality: string, county: string, city: string) => {
  console.log('...data');
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_PLACE_NAME',
      payload: {
        street,
        county,
        municipality,
        city
      }
    });
  };
};
