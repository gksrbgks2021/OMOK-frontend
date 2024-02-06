// AuthReducer.js

// Action types
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
// Initial state
const initialState = {
  id: null,
  email: null,
  error: null,
};
// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        id: action.payload,
        email: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        id: null,
        email: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
// Action creators
export const signupSuccess = (id, email) => ({
  type: SIGNUP_SUCCESS,
  payload: { id, email },
});
export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
export default authReducer;
