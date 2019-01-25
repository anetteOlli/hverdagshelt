// @flow
import type { Action } from '../reducers/asyncReducer';

/**
 * @fileOverview The async redux actions that alerts the component if the app is loading or not.
 */

/**
 * Set the loading state in redux to on or off.
 * @param isLoading
 * @returns {{payload: boolean, type: string}}
 */
export const setAsyncLoading = (isLoading: boolean = true): Action => {
  return {
    type: 'SET_LOADING',
    payload: isLoading
  };
};

/**
 * Notifies the app that redux has checked if a user was logged in or not after a refresh.
 * @returns {{payload: boolean, type: string}}
 */
export const checkedJWT = (): Action => {
  return {
    type: 'CHECKED_JWT',
    payload: true
  };
};
