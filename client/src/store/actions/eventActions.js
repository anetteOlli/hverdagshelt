// @flow
import type { Action } from '../reducers/eventReducer';
import type { ReduxState } from '../reducers';
import { postData, patchData, deleteData, getData } from '../axios';

/**
 * @fileOverview The event redux actions that gets, deletes, edits event.
 */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

/**
 * Get all events.
 * @returns {function(Dispatch, GetState): *}
 */
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

/**
 * Get all events of the selected municipality.
 * @param municipality The selected municipality.
 * @param county The selected county.
 * @returns {function(Dispatch, GetState): *}
 */
export const getEventsByMuni = (municipality: string, county: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('events/municipality', { municipality, county })
      .then(response =>
        dispatch({
          type: 'EVENTS_BY_MUNI_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'EVENTS_BY_MUNI_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Creates a new event.
 * @param newEvent The json object of the new event.
 * @param bool A boolean that notifies the axios-util if the event contains a image or not.
 * @returns {function(Dispatch): *}
 */

export const createEvent = (newEvent: JSON, bool: boolean) => {
  return (dispatch: Dispatch) => {
    return postData('events', newEvent, bool)
      .then(() =>
        dispatch({
          type: 'CREATE_EVENT_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'CREATE_EVENT_ERROR',
          payload: error
        })
      );
  };
};

/**
 * Edits an event.
 * @param event The event with new attributes.
 * @returns {function(Dispatch): *}
 */
export const editEvent = (event: JSON) => {
  return (dispatch: Dispatch) => {
    return patchData('events', event).then(() =>
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

/**
 * Deletes an event.
 * @param id The selected id of the event will be deleted.
 * @returns {function(Dispatch): *}
 */
export const deleteEvent = (id: number) => {
  return (dispatch: Dispatch) => {
    return deleteData(`events/${id}`)
      .then(() =>
        dispatch({
          type: 'DELETE_EVENT_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'DELETE_EVENT_ERROR',
          payload: error
        })
      );
  };
};
