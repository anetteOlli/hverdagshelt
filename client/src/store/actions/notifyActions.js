// @flow
import type { Action } from '../reducers/notifyReducer';

/**
 * @fileOverview The notify redux actions that adds and removes notifications in the redux store.
 */

/**
 * Add a notification to the notify reducer.
 * @param message The message of the notification.
 * @param variant The variant of the notification.
 * @returns {{payload: {options: {variant: ("success"|"error"|"warning"|"info")}, message: string, key: number}, type: string}}
 */
export const enqueueSnackbar = (message: string, variant: 'success' | 'error' | 'warning' | 'info'): Action => {
  return {
    type: 'ENQUEUE_SNACKBAR',
    payload: {
      key: new Date().getTime() + Math.random(),
      message,
      options: { variant }
    }
  };
};
/**
 * Removes the selected notification from the notify reducer.
 * @param key The selected key
 * @returns {{payload: string, type: string}}
 */
export const removeSnackbar = (key: string): Action => ({
  type: 'REMOVE_SNACKBAR',
  payload: key
});
