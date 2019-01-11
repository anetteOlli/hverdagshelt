// @flow
import type { Action, State } from '../reducers/mapReducer';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

//
export const updateMap = (lat: string, lng: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'UPDATE_MAP',
      lat: lat,
      lng: lng
    });
  };
};

export const placeChanged = (lat: string, lng: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'UPDATE_CENTER',
      lat: lat,
      lng: lng
    });
  };
};

export const changePlaceName = (street: string, municipality: string, county: string) => {
  console.log('...data');
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'UPDATE_PLACE_NAME',
      street,
      county,
      municipality
    });
  };
};
