// Initial state
const initialState = { isBlackTurn: false };

const CHANGE_TURN = "CHANGE_TURN";
// Reducer
const TurnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TURN:
      return {
        ...state,
        isBlackTurn: !state.isBlackTurn,
      };
    default:
      return state;
  }
};
// Action types

export const Change_Turn = () => ({ type: CHANGE_TURN });
export default TurnReducer;
