// @flow
import type { Action } from '../reducers/eventReducer';
import type { State } from '../reducers';
import { postData, putData, deleteData, getData } from '../util';

/**
 * @fileOverview categoryActions: actions for categories in redux
 * */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const getAllEvents = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('events').then(response =>
      dispatch({
        type: 'EVENTS_BY_ALL_SUCCESS',
        payload: response.data
      }).catch((error: Error) =>
        dispatch({
          type: 'EVENTS_BY_ALL_ERROR',
          payload: error
        })
      )
    );
  };
};

export const getEventsByMuni = (muni: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`events/${muni}`).then(response =>
      dispatch({
        type: 'EVENTS_BY_MUNI_SUCCESS',
        payload: response.data
      }).catch((error: Error) =>
        dispatch({
          type: 'EVENTS_BY_MUNI_ERROR',
          payload: error
        })
      )
    );
  };
};

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
