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

export const entrepreneurs_get_one_by_User_fk = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`entrepreneurs/id/${getState().user.userID}`)
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_USER_FK_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_USER_FK_ERROR',
          payload: error
        })
      );
  };
};

export const getEntrepreneursByMuniAndCat = p => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('entrepreneurs/getcatmuni', {
      municipality_fk: p.municipality_fk,
      county_fk: p.county_fk,
      category_fk: p.category_fk
    })
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

export const getEntrepreneursByMuni = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('entrepreneurs/getcatmuni', {
      municipality_fk: p.municipality_fk,
      county_fk: p.county_fk,
      category_fk: p.category_fk
    })
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