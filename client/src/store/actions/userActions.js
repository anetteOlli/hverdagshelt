// @flow
import type { Action, State } from '../reducers/userReducer';
import { setToken, clearToken, signInAxios, postData, getData, getToken } from '../util';
import { loading } from './appActions';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const signIn = (creds: { email: string, password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'LOADING',
      payload: true
    });
    return signInAxios(creds)
      .then((response: { token: string, id: number }) => {
        setToken(response.token);
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          payload: response.id
        });
        loading(false);
      })
      .catch((error: Error) => {
        dispatch({
          type: 'SIGN_IN_ERROR',
          payload: error
        });
        loading(false);
      });
  };
};

export const refresh = () => {
  return (dispatch: Dispatch) => {
    if (!getToken())
      return dispatch({
        type: 'REFRESH_ERROR',
        payload: 'NO JWT'
      });
    getData('users/refresh')
      .then((response: { token: string, id: number }) => {
        setToken(response.token);
        dispatch({
          type: 'REFRESH_SUCCESS',
          payload: response.id
        });
      })
      .catch(() => {
        dispatch({
          type: 'REFRESH_ERROR',
          payload: 'WRONG JWT'
        });
      });
  };
};

export const signUp = (newUser: JSON) => {
  return (dispatch: Dispatch) => {
    return postData('users', newUser)
      .then(() => {
        return dispatch({
          type: 'SIGN_UP_SUCCESS'
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'SIGN_UP_ERROR',
          payload: error
        })
      );
  };
};

export const signOut = () => {
  return (dispatch: Dispatch) => {
    clearToken();
    dispatch({
      type: 'SIGN_OUT_SUCCESS'
    });
  };
};
