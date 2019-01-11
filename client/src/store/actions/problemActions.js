// @flow
import type { Action, State } from '../reducers/problemReducer';
import { postData, putData, deleteData, getData} from '../util';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const createProblem = (newProblem: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems', newProblem).then(() =>
      dispatch({
        type: 'CREATE_PROBLEM_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'CREATE_PROBLEM_ERROR',
          error
        })
      )
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

export const getProblem = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${id}`).then((problem) =>
      dispatch({
        type: 'GOT_PROBLEM_SUCCESS', problem
      }).catch((error: Error) =>
        dispatch({
          type: 'GOT_PROBLEM_ERROR',
          error
        })
      )
    );
  };
};
