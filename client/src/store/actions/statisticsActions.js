// @flow
import type { Action as StatiAction } from '../reducers/statisticsReducer';
import type { Action as NotifyAction } from '../reducers/notifyReducer';
import type { ReduxState } from '../reducers';
import { postData } from '../axios';
import { enqueueSnackbar } from './notifyActions';

/**
 * @fileOverview The statistics redux actions that gets all the problems and changes the redux store, depending on what the user will display.
 */
type Action = NotifyAction | StatiAction;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

/**
 * Get all problems of the users municipality.
 * @returns {function(Dispatch, GetState): *}
 */
export const getProblemsByMuni = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems/municipality/sorted', getState().user.currentMuni)
      .then(response => {
        if (response.data.length > 0) {
          dispatch({
            type: 'GET_ALL_PROBLEMS_SUCCESS',
            payload: response.data
          });
          dispatch(enqueueSnackbar('Hentet data fra databasen', 'success'));
        } else {
          dispatch({
            type: 'GET_ALL_PROBLEMS_ERROR',
            payload: new Error('Tom database')
          });
          dispatch(enqueueSnackbar('Kommunen har ikke noe data å vise', 'error'));
        }
      })
      .catch((error: Error) => {
        dispatch({
          type: 'GET_ALL_PROBLEMS_ERROR',
          payload: error
        });
        dispatch(enqueueSnackbar('Feil med databasen', 'error'));
      });
  };
};

/**
 * Set the selected municipality that the user will display.
 * @param selectedMuni
 * @returns {function(Dispatch, GetState): *}
 */
export const setSelectedMuni = (selectedMuni: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return dispatch({
      type: 'SET_SELECTED_MUNI',
      payload: selectedMuni
    });
  };
};
/**
 * Updates the statistic reducer to display the problems data of the selected month.
 * @param selectedMonth The selected month.
 * @returns {{payload: string, type: string}}
 */
export const getProblemsByMonth = (selectedMonth: string): Action => ({
  type: 'GET_PROBLEMS_BY_MONTH',
  payload: selectedMonth
});
/**
 * Updates the statistic reducer to display the problems data of the selected year.
 * @param selectedYear The selected year.
 * @returns {{payload: string, type: string}}
 */
export const getProblemsByYear = (selectedYear: string): Action => ({
  type: 'GET_PROBLEMS_BY_YEAR',
  payload: selectedYear
});


/**
 * Get the all the categories to the statistics reducer.
 * @returns {Function}
 */
export const getProblemsByCategory = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: 'GET_PROBLEMS_BY_CATEGORY',
      payload: state.category.categories
    });
  };
};

export const getProblemsByEntrepreneur = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: 'GET_PROBLEMS_BY_ENTREPRENEUR',
      payload: state.entrepreneur.entrepreneurs
    });
  };
};
