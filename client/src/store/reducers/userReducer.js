// @flow
const initState = {
  loggedIn: false
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      console.log('SIGN_IN_SUCCESS');
      return {
        ...state,
        loggedIn: true
      };
    case 'SIGN_OUT_SUCCESS':
      console.log('SIGN_OUT_SUCCESS');
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};
export default userReducer;
