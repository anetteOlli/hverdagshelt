// @flow
import type { Action, Problem } from '../reducers/problemReducer';
import type { State } from '../reducers';
import { postData, putData, deleteData, getData } from '../util';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const getProblemById = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    getData(`problems/${id}`).then(respone =>
      dispatch({
        type: 'PROBLEM_BY_ID_SUCCESS',
        payload: respone.data
      }).catch((error: Error) =>
        dispatch({
          type: 'PROBLEM_BY_ID_ERROR',
          payload: error
        })
      )
    );
  };
};

export const createProblem = (newProblem: Problem) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems', newProblem)
      .then(() =>
        dispatch({
          type: 'CREATE_PROBLEM_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'CREATE_PROBLEM_ERROR',
          payload: error
        })
      );
  };
};

export const editProblem = (problem: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return putData('problems', problem).then(() =>
      dispatch({
        type: 'EDIT_PROBLEM_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'EDIT_PROBLEM_ERROR',
          payload: error
        })
      )
    );
  };
};

export const deleteProblem = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return deleteData(`problems/${id}`).then(() =>
      dispatch({
        type: 'DELETE_PROBLEM_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'DELETE_PROBLEM_ERROR',
          payload: error
        })
      )
    );
  };
};

export const getProblemsByState = (state: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${state}`).then(problems =>
      dispatch({
        type: 'PROBLEMS_BY_MUNI_SUCCESS',
        payload: problems
      }).catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_MUNI_ERROR',
          payload: error
        })
      )
    );
  };
};

export const getProblemsByMuniAndStreet = (muni: string, street: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${muni}/${street}`)
      .then(problems =>
        dispatch({
          type: 'PROBLEMS_BY_STREET_SUCCESS',
          payload: problems
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_STREET_ERROR',
          payload: error
        })
      );
  };
};
