// @flow
import type { Action, State } from '../reducers/userReducer';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

const testPromise = new Promise(function(resolve, reject) {
  resolve('Success!');
});

export const signIn = (creds: { email: string, password: string }) => {
  return (dispatch: Dispatch, getState: GetState) => {
    testPromise.then(() =>
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        token: 'this is a token'
      }).catch((error: Error) =>
        dispatch({
          type: 'SIGN_IN_ERROR',
          error
        })
      )
    );
  };
};

export const signUp = (newUser: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    testPromise.then(() =>
      dispatch({
        type: 'SIGN_UP_SUCCESS',
        token: 'this is a token'
      }).catch((error: Error) =>
        dispatch({
          type: 'SIGN_UP_ERROR',
          error
        })
      )
    );
  };
};

export const signOut = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    //axios.post.....
    dispatch({
      type: 'SIGN_OUT_SUCCESS'
    });
  };
};
