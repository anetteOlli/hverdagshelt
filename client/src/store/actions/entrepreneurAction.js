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

export const entrepreneurs_get_one_by_user_id = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`entrepreneurs/id/${getState().user.user_id}`)
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_user_id_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_user_id_ERROR',
          payload: error
        })
      );
  };
};

export const entrepreneurs_get_one_by_problem_id = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`entrepreneurs/problem/${id}`)
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_PROBLEM_ID_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_PROBLEM_ID_ERROR',
          payload: error
        })
      );
  };
};

export const entrepreneurs_get_one_by_entrepreneur_id = (id) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`entrepreneurs/e_id/${id}`)
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_entrepreneur_id_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_FROM_entrepreneur_id_ERROR',
          payload: error
        })
      );
  };
};

export const getEntrepreneursByMuniAndCat = p => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('entrepreneurs/getcatmuni', {
      municipality: p.municipality,
      county: p.county,
      category: p.category
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
    return postData('entrepreneurs/municipality', getState().user.currentMuni)
      .then(response => {
        if (response.data.length > 0) {
          dispatch({
            type: 'ENTREPRENEUR_GET_BY_MUNI_SUCCESS',
            payload: response.data
          });
        } else {
          dispatch({
            type: 'ENTREPRENEUR_GET_BY_MUNI_ERROR',
            payload: new Error('Database tom')
          });
        }
      })
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_BY_MUNI_ERROR',
          payload: error
        })
      );
  };
};
