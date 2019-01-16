export type State = {};
export type Action = { type: 'ENTREPRENEUR_GET_ALL_SUCCESS' } | { type: 'ENTREPRENEUR_GET_ALL_ERROR', payload: Error };

const initState = {
  entrepreneurs: [
    {
      entrepreneur_id: -1,
      bedriftnavn: '',
      org_nr: '',
      user_fk: -1
    }
  ],
  errorMessage: ''
};

export default (state: State = initState, action: Action) => {
  switch (action.type) {
    case 'ENTREPRENEUR_GET_ALL_SUCCESS':
      console.log('%c ENTREPRENEUR_GET_ALL_SUCCESS', 'color: green; font-weight: bold;', action.payload);
      return {
        errorMessage: ''
      };
    case 'ENTREPRENEUR_GET_ALL_ERROR':
      console.log('%c ENTREPRENEUR_GET_ALL_ERROR', 'color: red; font-weight: bold;', action.payload);
      return {
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
