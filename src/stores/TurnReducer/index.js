import { combineReducers } from "redux";

const isBlackTurnReducer = (state = true, action) => {
  switch (action.type) {
    case "changeTurn":
      console.log("change! : ", state);
      return !state;
    default:
      console.log("default! : ", state);
      return state;
  }
};

export default combineReducers({
  isBlackTurn: isBlackTurnReducer,
});
