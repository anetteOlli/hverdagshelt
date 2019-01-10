// @flow
import type { Action, State } from '../reducers/updateMap';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

//
export const updateMap = (cords: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'UPDATE_MAP',
      action: cords
    });
  };
};
