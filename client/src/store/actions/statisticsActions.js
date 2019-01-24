// @flow
import type { Action } from '../reducers/statisticsReducer';
import type { ReduxState } from '../reducers';
import { postData } from '../axios';
import { enqueueSnackbar } from './notifyActions';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

export const getProblemsByMuni = muni => {
  console.log(muni);
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems/municipality/sorted', muni)
      .then(response => {
        if (response.data.length > 0) {
          dispatch({
            type: 'GET_ALL_PROBLEMS_SUCCESS',
            payload: response.data
          });
          dispatch(enqueueSnackbar('U in', 'success'));
        } else
          dispatch({
            type: 'GET_ALL_PROBLEMS_ERROR',
            payload: new Error({ message: 'REEE' })
          });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'GET_ALL_PROBLEMS_ERROR',
          payload: error
        })
      );
  };
};

export const setSelectedMuni = selectedMonth => {
  return (dispatch: Dispatch, getState: GetState) => {
    return dispatch({
      type: 'SET_SELECTED_MUNI',
      payload: selectedMonth
    });
  };
};

export const getProblemsByMonth = (selectedMonth: string): Action => ({
  type: 'GET_PROBLEMS_BY_MONTH',
  payload: selectedMonth
});

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
      payload: state.entrepreneur.currentEntrepreneur
    });
  };
};

/*
export const getLineChartData = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('statistics/lineChartData', getState().statistic.selectedMuni).then(response =>
      dispatch({
        type: 'LINE_CHART_DATA_SUCCESS',
        payload: response.data
      }).catch((error: Error) =>
        dispatch({
          type: 'LINE_CHART_DATA_ERROR',
          payload: error
        })
      )
    );
  };
};

export const getPieChartData = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('statistics/pieChartData', getState().statistic.selectedMuni).then(response =>
      dispatch({
        type: 'PIE_CHART_DATA_SUCCESS',
        payload: response.data
      }).catch((error: Error) =>
        dispatch({
          type: 'PIE_CHART_DATA_ERROR',
          payload: error
        })
      )
    );
  };
};

export const getBarChartData = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('statistics/barChartData', getState().statistic.selectedMuni).then(response =>
      dispatch({
        type: 'BAR_CHART_DATA_SUCCESS',
        payload: response.data
      }).catch((error: Error) =>
        dispatch({
          type: 'BAR_CHART_DATA_ERROR',
          payload: error
        })
      )
    );
  };
};

 */
