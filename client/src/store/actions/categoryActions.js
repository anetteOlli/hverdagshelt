// @flow
import type { Action, State } from '../reducers/categoryReducer';
import { postData, putData, deleteData } from '../util';

/**
 * @fileOverview categoryActions: actions for categories in redux
 * */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;

export const createCategory = (newCategory: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('categories', newCategory).then(() =>
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

export const editCategory = (category: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return putData('categories', category).then(() =>
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

export const deleteCategory = (id: number) => {
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
