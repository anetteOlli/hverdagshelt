// @flow
import type { Action, State } from '../reducers/mapReducer';
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

export const placeChanged = (lat: string, lng: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_CENTER',
      payload: {
        lat: lat,
        lng: lng
      }
    });
  };
};

export const changePlaceName = (street: string, muni: string, county: string) => {
  console.log('...data');
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'UPDATE_PLACE_NAME',
      payload: {
        street,
        county,
        muni
      }
    });
  };
};
