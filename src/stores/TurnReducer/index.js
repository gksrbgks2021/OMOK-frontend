import { combineReducers } from "redux";

const initialState = { isBlack: true };

const isBlackTurnReducer = (state = initialState, action) => {
  switch (action.type) {
    case "blackTurn":
      return {
        ...state,
        isBlack: false,
      };
    case "whiteTurn":
      return {
        ...state,
        isBlack: true,
      };
    default:
      return state;
  }
};

export default isBlackTurnReducer;
