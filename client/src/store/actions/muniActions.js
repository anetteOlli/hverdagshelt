// // @flow
// import type { Action } from '../reducers/muniReducer';
// import type { State } from '../reducers';
// import { postData, deleteData, getData } from '../util';
//
// type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
// type PromiseAction = Promise<Action>;
// type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
// type GetState = () => State;
//
// export const getMunicipalities = () => {
//   return (dispatch: Dispatch, getState: GetState) => {
//     return getData('municipalities')
//       .then(response =>
//         dispatch({
//           type: 'GET_MUNICIPALITIES_SUCCESS',
//           payload: response.data.municipalities
//         })
//       )
//       .catch((error: Error) =>
//         dispatch({
//           type: 'GET_MUNICIPALITIES_ERROR',
//           payload: error
//         })
//       );
//   };
// };
