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
  console.log("authReducer : ", action.payload);
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
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
