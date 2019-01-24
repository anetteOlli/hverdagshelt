// @flow
import type { Action } from '../reducers/asyncReducer';

export const setAsyncLoading = (isLoading: boolean = true): Action => {
  return {
    type: 'SET_LOADING',
    payload: isLoading
  };
};

export const checkedJWT = (): Action => {
  return {
    type: 'CHECKED_JWT',
    payload: true
  };
};
