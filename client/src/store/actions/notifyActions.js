// @flow
import type {Action} from '../reducers/notifyReducer';
export const enqueueSnackbar = (message: string, variant: 'success' | 'error' | 'warning' | 'info'): Action => {
  return {
    type: 'ENQUEUE_SNACKBAR',
    payload: {
      key: new Date().getTime() + Math.random(),
      message,
      options: { variant }
    }
  }
};

export const removeSnackbar = (key: string): Action => ({
  type: 'REMOVE_SNACKBAR',
  payload: key
});
