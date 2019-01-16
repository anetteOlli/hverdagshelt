// @flow
import type { Action } from '../reducers/muniReducer';
import type { State } from '../reducers';
import { getData } from '../util';

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

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
