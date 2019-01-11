// @flow
import type { Action, State } from '../reducers/problemReducer';
import { postData, putData, deleteData, getData } from '../util';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const getProblemById = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${id}`).then(problems =>
      dispatch({
        type: 'PROBLEM_BY_ID_SUCCESS',
        problems
      }).catch((error: Error) =>
        dispatch({
          type: 'PROBLEM_BY_ID_ERROR',
          error
        })
      )
    );
  };
};

export const createProblem = (newProblem: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems', newProblem).then(() =>
      dispatch({
        type: 'CREATE_PROBLEM_SUCCESS'
      })).catch((error: Error) =>
        dispatch({
          type: 'CREATE_PROBLEM_ERROR',
          error
        }))
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
          error
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
          error
        })
      )
    );
  };
};

export const getProblemsByState = (state: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${state}`).then(problems =>
      dispatch({
        type: 'PROBLEMS_BY_STATE_SUCCESS',
        problems
      }).catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_STATE_ERROR',
          error
        })
      )
    );
  };
};

export const getProblemsByMuniAndStreet = (muni: string, street: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${muni}/${street}`).then(problems =>
      dispatch({
        type: 'PROBLEMS_BY_MUNI_AND_STREET_SUCCESS',
        problems
      })).catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_MUNI_AND_STREET_ERROR',
          error
      }))
  };
};
