// @flow
import type { Action } from '../reducers/statisticsReducer';
import type { ReduxState } from '../reducers';
import { getData } from '../axios';

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

export const getLineChartData = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`statistics/lineChartData/${muni}`).then(response =>
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
    return getData(`statistics/pieChartData/${muni}`).then(response =>
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
    return getData(`statistics/barChartData/${muni}`).then(response =>
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
