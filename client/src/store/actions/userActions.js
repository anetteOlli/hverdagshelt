// @flow
import type { Action } from '../reducers/userReducer';
import type { ReduxState } from '../reducers';
import type { Action as AppAction } from '../reducers/appReducer';
import { setToken, clearToken, postData, getData, getToken, patchData } from '../axios';
import { loading, hasCheckedJWT } from './appActions';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction | AppAction) => any;
type GetState = () => ReduxState;

export const getUserInfo = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`users/${getState().user.user_id}`)
      .then(response => {
        console.log("Rsp userInfo: ", response.data);
        dispatch({
          type: 'GET_USER_INFO_SUCCESS',
          payload: response.data
        });
      }
      )
      .catch((error: Error) =>
        dispatch({
          type: 'GET_USER_INFO_ERROR',
          payload: error
        })
      );
  };
};

export const signIn = (creds: { email: string, password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(loading());
    return postData('users/login', creds)
      .then(response => {
        console.log("Response: ", response);
        setToken(response.data.jwt);
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          payload: {
            user_id: response.data.id,
            priority: response.data.priority,
            municipality: response.data.municipality,
            county: response.data.county
          }
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
      dispatch(hasCheckedJWT());
    } else {
      getData('users/refresh')
        .then(response => {
          console.log("Response refresh: ", response);
          setToken(response.data.jwt);
          dispatch({
            type: 'REFRESH_SUCCESS',
            payload: {
              user_id: response.data.id,
              priority: response.data.priority,
              municipality: response.data.municipality,
              county: response.data.county
            }
          });
          dispatch(hasCheckedJWT());
        })
        .catch((error: Error) => {
          dispatch({
            type: 'REFRESH_ERROR',
            payload: error.message
          });
          dispatch(hasCheckedJWT());
        });
    }
  };
};

export const signUpUser = (newUser: JSON) => {
  console.log('SignUpUser', newUser);
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

export const signUpEntrepreneur = (newUser: JSON, newEntrepreneur: JSON) => {
  console.log('SignUpEnt', newUser, newEntrepreneur);
  return (dispatch: Dispatch) => {
    return postData('entrepreneurs', { user: newUser, entrepreneur: newEntrepreneur })
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

export const clearError = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'CLEAR_ERROR'
    });
  };
};

export const forgotPassword = (email: string) => {
  return (dispatch: Dispatch) => {
    return postData('users/f/forgot', {email})
      .then(() => {
        return dispatch({
          type: 'TEMP_PASSWORD_SUCCESS'
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'TEMP_PASSWORD_ERROR',
          payload: error
        })
      );
  };
};
export const setNewPassword = (user_id: number, password: string, email: string) => {
  return (dispatch: Dispatch) => {
    return patchData('users/changePassword', { user_id, password, email })
      .then(() => {
        return dispatch({
          type: 'NEW_PASSWORD_SUCCESS'
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'NEW_PASSWORD_ERROR',
          payload: error
        })
      );
  };
};
