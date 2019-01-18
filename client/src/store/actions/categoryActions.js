// @flow
import type { Action } from '../reducers/categoryReducer';
import type { ReduxState } from '../reducers';
import { postData, deleteData, getData } from '../axios';

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

export const createCategory = (newCategory: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('categories', newCategory).then(() =>
      dispatch({
        type: 'CREATE_CATEGORY_SUCCESS'
      }).catch((error: Error) =>
        dispatch({
          type: 'CREATE_CATEGORY_ERROR',
          payload: error
        })
      )
    );
  };
};

export const deleteCategory = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return deleteData(`categories/${id}`)
      .then(() =>
        dispatch({
          type: 'DELETE_CATEGORY_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'DELETE_CATEGORY_ERROR',
          payload: error
        })
      );
  };
};

export const getCategories = () => {
  console.log('you got to category actions!');
  return (dispatch: Dispatch, getState: GetState) => {
    return getData('categories')
      .then(response =>
        dispatch({
          type: 'GET_CATEGORIES_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'GET_CATEGORIES_ERROR',
          payload: error
        })
      );
  };
};
