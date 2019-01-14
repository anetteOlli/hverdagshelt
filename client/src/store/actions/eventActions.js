// @flow
import type { Action } from '../reducers/eventReducer';
import type { State } from '../reducers';
import { postData, putData, deleteData } from '../util';

/**
 * @fileOverview categoryActions: actions for categories in redux
 * */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const createEvent = (newEvent: JSON) => {
  return (dispatch: Dispatch) => {
    return postData('events', newEvent).then(() =>
      dispatch({
        type: 'CREATE_EVENT_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'CREATE_EVENT_ERROR',
          payload: error
        })
      )
    );
  };
};

export const editEvent = (event: JSON) => {
  return (dispatch: Dispatch) => {
    return putData('events', event).then(() =>
      dispatch({
        type: 'EDIT_EVENT_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'EDIT_EVENT_ERROR',
          payload: error
        })
      )
    );
  };
};

export const deleteEvent = (id: number) => {
  return (dispatch: Dispatch) => {
    return deleteData(`events/${id}`).then(() =>
      dispatch({
        type: 'DELETE_EVENT_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'DELETE_EVENT_ERROR',
          payload: error
        })
      )
    );
  };
};
