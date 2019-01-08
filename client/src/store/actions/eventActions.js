// @flow
import type { Action, State } from '../reducers/eventReducer';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

const testPromise = new Promise(function(resolve, reject) {
    resolve('Success!');
});

export const createEvent = (newEvent: JSON) => {
    return (dispatch: Dispatch, getState: GetState) => {
        testPromise.then(() =>
            dispatch({
                type: 'CREATE_EVENT_SUCCESS'
            }).catch((error: Error) =>
                dispatch({
                    type: 'CREATE_EVENT_ERROR',
                    error
                })
            )
        );
    };
};

export const editEvent = (event: JSON) => {
    return (dispatch: Dispatch, getState: GetState) => {
        testPromise.then(() =>
            dispatch({
                type: 'EDIT_EVENT_SUCCESS'
            }).catch((error: Error) =>
                dispatch({
                    type: 'EDIT_EVENT_ERROR',
                    error
                })
            )
        );
    };
};

export const deleteEvent = () => {
    return (dispatch: Dispatch, getState: GetState) => {
        testPromise.then(() =>
            dispatch({
                type: 'DELETE_EVENT_SUCCESS'
            }).catch((error: Error) =>
                dispatch({
                    type: 'DELETE_EVENT_ERROR',
                    error
                })
            )
        );
    };
};
