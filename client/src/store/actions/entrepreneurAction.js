// @flow
import type { Action } from '../reducers/entrepreneurReducer';
import type { ReduxState } from '../reducers';
import { getData } from '../axios';

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

export const getAllEntrepreneur = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('entrepreneurs')
      .then(response =>
        dispatch({
          type: 'ENTREPRENEUR_GET_ALL_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'ENTREPRENEUR_GET_ALL_ERROR',
          payload: error
        })
      );
  };
};
