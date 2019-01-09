// @flow
import type { Action, State } from '../reducers/userReducer';
import axios from 'axios';
import { setToken, clearToken } from '../util';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

const url: string = '';

export const signIn = (creds: { email: string, password: string }) => {
  return (dispatch: Dispatch) => {
    axios
      .post(url + 'auth/login', creds)
      .then(response => {
        setToken(response.data.token);
        return dispatch({
          type: 'SIGN_IN_SUCCESS',
          token: response.data.token
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'SIGN_IN_ERROR',
          error
        })
      );
  };
};

export const signUp = (newUser: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    axios
      .post(url + 'auth/signup', newUser)
      .then(response => {
        setToken(response.data.token);
        return dispatch({
          type: 'SIGN_UP_SUCCESS',
          token: response.data.token
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'SIGN_UP_ERROR',
          error
        })
      );
  };
};

export const validateEmail = (email: { email: string }) => {
  return (dispatch: Dispatch, getState: GetState) => {
    axios
      .post(url + 'auth/email', email)
      .then(response => {
        setToken(response.data.token);
        return dispatch({
          type: 'SIGN_UP_SUCCESS',
          token: response.data.token
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'SIGN_UP_ERROR',
          error
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
