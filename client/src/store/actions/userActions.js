export const signIn = creds => {
    return (dispatch, getState) => {
        //axios.post.....
        dispatch({
            type: 'SIGN_IN_SUCCESS'
        })
    }
};
