// AuthReducer.js

const SHOW_MAIN = "SHOW_MAIN";
const HIDE_MAIN = "HIDE_MAIN";
// Initial state
const initialState = { isMainShown: false };

// Reducer
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAIN:
      return {
        ...state,
        isMainShown: true,
      };
    case HIDE_MAIN:
      return {
        ...state,
        isMainShown: false,
      };
    default:
      return state;
  }
};

// Action types
export const showMain = () => ({ type: SHOW_MAIN });
export const hideMain = () => ({ type: HIDE_MAIN });
export default mainReducer;
