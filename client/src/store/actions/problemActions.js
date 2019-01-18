// @flow
import type { Action, Problem } from '../reducers/problemReducer';
import type { ReduxState } from '../reducers';
import { postData, patchData, deleteData, getData } from '../axios';
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => ReduxState;

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

export const getProblemByUser = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    console.log('E: ' + state.user.priority);
    switch (state.user.priority) {
      case 'Standard':
        console.log('Yo mackaflow, this the getState().user.userID yo: ' + getState().user.userID);
        return getData(`problems/user/${getState().user.userID}`)
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_USER_ERROR',
              payload: error
            })
          );
      case 'Entrepreneur':
        return getData('problems/entrepreneur/')
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_USER_ERROR',
              payload: error
            })
          );
      case 'Administrator':
        return postData('problems/municipality', { municipality: 'Trondheim', county: 'Trøndelag' })
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_USER_ERROR',
              payload: error
            })
          );
      case 'Municipality':
        return postData('problems/municipality', { muni: 'Trondheim', county: 'Trøndelag' })
          .then(respond =>
            dispatch({
              type: 'PROBLEMS_BY_USER_SUCCESS',
              payload: respond.data
            })
          )
          .catch((error: Error) =>
            dispatch({
              type: 'PROBLEMS_BY_USER_ERROR',
              payload: error
            })
          );
      default:
        return dispatch({ type: 'PROBLEMS_BY_USER_ERROR', payload: 'Feil' });
    }
  };
};

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

export const editProblem = (problem: Problem) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return patchData(`problems/${problem.problem_id}`, problem)
      .then(() =>
        dispatch({
          type: 'EDIT_PROBLEM_SUCCESS'
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

export const getProblemsByMuni = (municipality: string, county: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return postData('problems/municipality', { municipality, county })
      .then(response =>
        dispatch({
          type: 'PROBLEMS_BY_MUNI_SUCCESS',
          payload: response.data
        })
      )
      .catch((error: Error) =>
        dispatch({
          type: 'PROBLEMS_BY_MUNI_ERROR',
          payload: error
        })
      );
  };
};

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

export const goToProblemDetail = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'GO_TO_PROBLEM_DETAIL',
      payload: id
    });
  };
};

export const goToProblemEdit = (id: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: 'GO_TO_PROBLEM_EDIT',
      payload: id
    });
  };
};

export const problemAddEntrepreneur = (problem: JSON) => {
  return (dispatch: Dispatch, getState: GetState) => {
    patchData('problems/add/entrepreneur', problem)
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

export const supportProblem = (userId: number, problemId: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    return patchData(`problems/vote/${problemId}`, { userId, problemId })
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
