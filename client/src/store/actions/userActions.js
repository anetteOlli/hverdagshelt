// @flow
import type { Action } from '../reducers/userReducer';
import type { State } from '../reducers';
import type { Action as AppAction } from '../reducers/appReducer';
import { setToken, clearToken, signInAxios, postData, getData, getToken } from '../util';
import { loading, hasCheckedJWT } from './appActions';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction | AppAction) => any;
type GetState = () => State;

export const signIn = (creds: { email: string, password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(loading());
    return signInAxios(creds)
      .then(response => {
        setToken(response.data.token);
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          payload: response.data.id
        });
        dispatch(loading(false));
      })
      .catch((error: Error) => {
        dispatch({
          type: 'SIGN_IN_ERROR',
          payload: error
        });
        dispatch(loading(false));
      });
  };
};

export const refresh = () => {
  return (dispatch: Dispatch) => {
    if (!getToken()) {
      dispatch({
        type: 'REFRESH_ERROR',
        payload: 'NO JWT'
      });
    } else {
      getData('users/refresh')
        .then(response => {
          setToken(response.data.token);
          dispatch({
            type: 'REFRESH_SUCCESS',
            payload: response.data.id
          });
        })
        .catch(() => {
          dispatch({
            type: 'REFRESH_ERROR',
            payload: 'WRONG JWT'
          });
        });
    }
    dispatch(hasCheckedJWT());
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
