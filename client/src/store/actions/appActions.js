// @flow
import type { Action } from '../reducers/appReducer';

/**
 * Set loading on/off for animation in the app
 * @param isLoading
 * @returns {{payload: boolean, type: string}}
 */
export const loading = (isLoading: boolean = true): Action => {
  return {
    type: 'SET_LOADING',
    payload: isLoading
  };
};
