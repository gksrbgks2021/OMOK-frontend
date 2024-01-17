// AuthReducer.js

// Action types
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
// Initial state
const initialState = {
    user: null,
    error: null,
};
// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
// Action creators
export const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: user,
});
export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: error,
});
export default authReducer;