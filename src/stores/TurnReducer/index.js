import { combineReducers } from "redux";

const initialState = {
  isBlack: 0,
  isThereMsg: false,
};
const BLACK_SIGN = "BLACK_SIGN";
const WHITE_SIGN = "WHITE_SIGN";
// 알람 보낼때 변경되는 훅
const NOTICE_SIGN = "NOTICE_SIGN";
const EMPTY_SIGN = "EMPTY_SIGN";

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
    case NOTICE_SIGN:
      return {
        ...state,
        isThereMsg: action.payload,
      };
    case EMPTY_SIGN:
      return {
        ...state,
        isThereMsg: action.payload,
      };
    default:
      return state;
  }
};
export const noticeMsg = () => ({
  type: NOTICE_SIGN,
  payload: true,
});
export const emptyMsg = () => ({
  type: EMPTY_SIGN,
  payload: false,
});
export default isBlackTurnReducer;
