// @flow
import type { Action, State } from '../reducers/categoryReducer';
import { postData, putData, deleteData } from '../util';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const createCategory = (newCATEGORY: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('categories', newCATEGORY).then(() =>
      dispatch({
        type: 'CREATE_CATEGORY_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'CREATE_CATEGORY_ERROR',
          error
        })
      )
    );
  };
};

export const editCATEGORY = (CATEGORY: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return putData('categories', CATEGORY).then(() =>
      dispatch({
        type: 'EDIT_CATEGORY_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'EDIT_CATEGORY_ERROR',
          error
        })
      )
    );
  };
};

export const deleteCATEGORY = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return deleteData(`categories/${id}`).then(() =>
      dispatch({
        type: 'DELETE_CATEGORY_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'DELETE_CATEGORY_ERROR',
          error
        })
      )
    );
  };
};
