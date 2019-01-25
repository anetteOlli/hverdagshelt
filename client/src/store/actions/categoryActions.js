// @flow
import type { Action } from '../reducers/categoryReducer';
import type { ReduxState } from '../reducers';
import { postData, deleteData, getData } from '../axios';
/**
 * @fileOverview The category redux actions that creates, deletes and removes categories.
 */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

/**
 * Creates a new category
 * @param newCategory The name of the new category.
 * @returns {function(Dispatch, GetState): *}
 */
export const createCategory = (newCategory: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('categories', newCategory)
      .then(() =>
        dispatch({
          type: 'CREATE_CATEGORY_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'CREATE_CATEGORY_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Deletes a selected category.
 * @param id The id of the selected category to delete.
 * @returns {function(Dispatch, GetState): *}
 */

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

/**
 * Gets all categories in the database.
 * @returns {function(Dispatch, GetState): *}
 */
export const getCategories = () => {
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
