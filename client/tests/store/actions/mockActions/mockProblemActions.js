// @flow

import type { Action, Problem } from '../reducers/problemReducer';
import type { ReduxState } from '../reducers';
import { postData, patchData, deleteData, getData } from '../axios';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

import 'cross-fetch/polyfill'

export const getProblemById = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'PROBLEM_BY_ID_SUCCESS',
      id
    });
  });
};
