// @flow
import type { Action } from '../reducers/entrepreneurReducer';
import type { ReduxState } from '../reducers';
import { getData, postData } from '../axios';

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

export const getAllEntrepreneurs = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('entrepreneurs')
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_ALL_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_ALL_ERROR',
          payload: error
        })
      );
  };
};

export const getEntrepreneursByMuniAndCat = (category_fk: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    //const val = [getState().problem.currentMuni.municipality_fk, getState().problem.currentMuni.county_fk, category_fk];
    return postData('entrepreneurs/getcatmuni', {...getState().problem.currentMuni, category_fk})
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_BY_MUNI_AND_CATEGORY_ERROR',
          payload: error
        })
      );
  };
};
