// @flow
const initState = {};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      console.log("lol");
    default:
      return state;

  }
};
export default userReducer;
