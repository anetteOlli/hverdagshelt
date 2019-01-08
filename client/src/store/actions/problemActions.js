// @flow
import type { Action, State } from '../reducers/problemReducer';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

const testPromise = new Promise(function(resolve, reject) {
  resolve('Success!');
});

export const createProblem = (newProblem: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    testPromise.then(() =>
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
    testPromise.then(() =>
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

export const deleteProblem = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    testPromise.then(() =>
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
