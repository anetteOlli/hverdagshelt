// @flow
import type { Action } from '../reducers/muniReducer';
import type { ReduxState } from '../reducers';
import { getData } from '../axios';

/**
 * @fileOverview The muni redux actions that gets the municipalities and counties in Norway.
 */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;


/**
 * Gets all the municipalities from the database.
 * @returns {function(Dispatch, GetState): *}
 */
export const getMunicipalities = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('div/municipalities')
      .then(response =>
        dispatch({
          type: 'GET_MUNICIPALITIES_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'GET_MUNICIPALITIES_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Get all the counties from the database.
 * @returns {function(Dispatch, GetState): *}
 */
export const getCounties = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('div/counties')
      .then(response =>
        dispatch({
          type: 'GET_COUNTIES_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'GET_COUNTIES_ERROR',
          payload: error
        })
      );
  };
};

/**
 * Get all the municipalities from the selected county.
 * @param county The selected county.
 * @returns {function(Dispatch, GetState): *}
 */
export const getMunicipalitiesByCounty = (county: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`div/${county}/municipalities`)
      .then(response =>
        dispatch({
          type: 'GET_COUNTIES_BY_MUNI_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'GET_COUNTIES_BY_MUNI_ERROR',
          payload: error
        })
      );
  };
};
