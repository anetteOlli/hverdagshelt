// @flow
import type { Action, Problem } from '../reducers/problemReducer';
import type { ReduxState } from '../reducers';
import { postData, patchData, deleteData, getData } from '../axios';

/**
 * @fileOverview The problem redux actions that gets, creates, edits and removes problems in the database.
 */

type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

/**
 * Get the selected problem.
 * @param id The id of the selected problem.
 * @returns {function(Dispatch, GetState): *}
 */
export const getProblemById = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/${id}`)
      .then(respond =>
        dispatch({
          type: 'PROBLEM_BY_ID_SUCCESS',
          payload: respond.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEM_BY_ID_ERROR',
          payload: error
        })
      );
  };
};

/**
 * Get problems depending on the status of the user.
 * If the user is a standard user return the problems created by that user.
 * If the user is an administrator returns all the problems.
 * If the user is an entrepreneur returns all the problems the entrepreneur is assigned to.
 * If the user is a municipality employee returns all the problems from the municipality the user is in.
 * @returns {Function}
 */

export const getProblemByUser = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    switch (state.user.priority) {
      case 'Standard':
        return getData(`problems/user/${getState().user.user_id}`)
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_STANDARD_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_STANDARD_USER_ERROR',
              payload: error
            })
          );
      case 'Entrepreneur':
        return getData(`problems/entrepreneur/${getState().entrepreneur.currentEntrepreneur}`)
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_ENTREPRENEUR_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_ENTREPRENEUR_USER_ERROR',
              payload: error
            })
          );
      case 'Administrator':
        return getData('problems/')
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_ADMINISTRATOR_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_ADMINISTRATOR_USER_ERROR',
              payload: error
            })
          );
      case 'Municipality':
        return postData('problems/municipality', { municipality: 'Trondheim', county: 'Trøndelag' })
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_MUNICIPALITY_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_MUNICIPALITY_USER_ERROR',
              payload: error
            })
          );
      default:
        return dispatch({ type: 'PROBLEMS_BY_USER_ERROR', payload: 'Feil' });
    }
  };
};

/**
 * Get all the problems of the selected entrepreneur.
 * @param entrepreneur_id The id of the selected entrepreneur.
 * @returns {function(Dispatch, GetState): *}
 */

export const getProblemByEntrepreneur = (entrepreneur_id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return getData(`problems/entrepreneur/${entrepreneur_id}`)
      .then(respond =>
        dispatch({
          type: 'PROBLEM_BY_ENTREPRENEUR_SUCCESS',
          payload: respond.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEM_BY_ENTREPRENEUR_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Creates a new problem.
 * @param newProblem A json object of the new problem.
 * @returns {function(Dispatch, GetState): *}
 */
export const createProblem = (newProblem: Problem) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems', newProblem)
      .then(() =>
        dispatch({
          type: 'CREATE_PROBLEM_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'CREATE_PROBLEM_ERROR',
          payload: error
        })
      );
  };
};

/**
 * Edit an old problem.
 * @param problem A json object of updated values of the selected problem.
 * @returns {function(Dispatch, GetState): *}
 */

export const editProblem = (problem: Problem) => {
  return (dispatch: Dispatch, getState: GetState) => {
    let k = new FormData();
    k.append('problem_title', problem.problem_title);
    k.append('problem_description', problem.problem_description);
    k.append('problem_locked', problem.problem_locked);
    k.append('description_entrepreneur', problem.description_entrepreneur);
    k.append('img_user', problem.img_user);
    k.append('img_entrepreneur', problem.img_entrepreneur);
    k.append('category', problem.category);
    k.append('status', problem.status);
    k.append('user_id', problem.user_id);
    k.append('entrepreneur_id', problem.entrepreneur_id);
    k.append('latitude', problem.latitude);
    k.append('longitude', problem.longitude);
    k.append('support', problem.support);
    k.append('municipality', problem.municipality);
    k.append('county', problem.county);
    k.append('city', problem.city);
    k.append('street', problem.street);
    k.append('date_finished', problem.date_finished);
    return patchData(`problems/${problem.problem_id}`, k)
      .then(resp =>
        dispatch({
          type: 'EDIT_PROBLEM_SUCCESS',
          payload: {
            ...problem,
            img_user: resp.data.img_user || '',
            img_entrepreneur: resp.data.img_entrepreneur || ''
          }
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'EDIT_PROBLEM_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Deletes a problem.
 * @param id The id of the selected problem.
 * @returns {function(Dispatch, GetState): *}
 */
export const deleteProblem = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return deleteData(`problems/${id}`)
      .then(() =>
        dispatch({
          type: 'DELETE_PROBLEM_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'DELETE_PROBLEM_ERROR',
          payload: error
        })
      );
  };
};

/**
 * Get all the problems of the selected municipality.
 * @param municipality The selected municipality.
 * @param county The selected county.
 * @returns {function(Dispatch, GetState): *}
 */

export const getProblemsByMuni = (municipality: string, county: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems/municipality', { municipality, county })
      .then(response => {
        // console.log("Respojnse: ", response.data); //OK
        dispatch({
          type: 'PROBLEMS_BY_MUNI_SUCCESS',
          payload: response.data
        });
      })
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_MUNI_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Get all the problems of a selcted street.
 * @param street The selcted street.
 * @param municipality The selected municiaplity.
 * @param county The selected county.
 * @returns {function(Dispatch, GetState): *}
 */
export const getProblemsByStreet = (street: string, municipality: string, county: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData(`problems/municipality/street`, { street, municipality, county })
      .then(response =>
        dispatch({
          type: 'PROBLEMS_BY_STREET_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_STREET_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Alert the redux store to go to problem details with the id of the selected problem.
 * @param id The id of the selected problem.
 * @returns {Function}
 */
export const goToProblemDetail = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'GO_TO_PROBLEM_DETAIL',
      payload: id
    });
  };
};
/**
 * Alert the redux store to go to problem edit with the id of the selected problem.
 * @param id The id of the selected problem.
 * @returns {Function}
 */

export const goToProblemEdit = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'GO_TO_PROBLEM_EDIT',
      payload: id
    });
  };
};
/**
 * Set the currentMuni in the problem reducer to the selected municipality.
 * @param county The selected county.
 * @param municipality The selected municipality.
 * @returns {{payload: {county: string, municipality: string}, type: string}}
 */
export const setMuni = (county: string, municipality: string) => ({
  type: 'SET_MUNI',
  payload: { county, municipality }
});
/**
 * Add an entrepreneur to a problem.
 * @param probEnt A json object that contains the problem id and entrepreneur id.
 * @returns {function(Dispatch, GetState): *}
 */
export const problemAddEntrepreneur = (probEnt: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return patchData('problems/add/entrepreneur', probEnt)
      .then(() =>
        dispatch({
          type: 'PROBLEM_ADD_ENTREPRENEUR_SUCCESS'
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEM_ADD_ENTREPRENEUR_ERROR',
          payload: error
        })
      );
  };
};
/**
 * Support a problem.
 * @param user_id The userId of the logged in user.
 * @param problemId The problem that the user will support.
 * @returns {function(Dispatch, GetState): *}
 */
export const supportProblem = (user_id: number, problemId: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return patchData(`problems/vote/${problemId}`, { user_id, problemId })
      .then(response =>
        dispatch({
          type: 'SUPPORT_PROBLEM_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'SUPPORT_PROBLEM_ERROR',
          payload: error
        })
      );
  };
};
