// @flow
import type { Action } from '../reducers/mapReducer';
import type { State } from '../reducers';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

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

export const changePlaceName = (street: string, muni: string, county: string, city: string) => {
  console.log('...data');
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_PLACE_NAME',
      payload: {
        street,
        county,
        muni,
        city
      }
    });
  };
};
