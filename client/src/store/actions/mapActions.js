// @flow
import type { Action } from '../reducers/mapReducer';
import type { ReduxState } from '../reducers';

/**
 * @fileOverview The map redux actions that updates the marker and address.
 */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;


/**
 * Update the map with a new location.
 * @param lat The new latitude location.
 * @param lng The new longitude location.
 * @returns The new location.
 */
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

/**
 * Update the marker of the map
 * @param lat The new latitude location.
 * @param lng The new longitude location.
 * @returns The new location.
 */

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

/**
 * Change the center of the map.
 * @param lat The new latitude location.
 * @param lng The new longitude location.
 * @returns The new location.
 */
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

/**
 * Updates the street, municipality, county and city to the mapReducer.
 * @param street
 * @param municipality
 * @param county
 * @param city
 * @returns The selected street, municipality, county and city.
 */

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
