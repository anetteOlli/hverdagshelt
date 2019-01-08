export const signIn = creds => {
    return (dispatch, getState) => {
        //axios.post.....
        dispatch({
            type: 'SIGN_IN_SUCCESS'
        })
    }
};
export const signOut = () => {
    return (dispatch, getState) => {
        //axios.post.....
        dispatch({
            type: 'SIGN_OUT_SUCCESS'
        })
    }
};
