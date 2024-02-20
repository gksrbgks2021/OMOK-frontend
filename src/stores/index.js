import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";
import TurnReducer from "./TurnReducer";
import ChatReducer from "./ChatReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    turn: TurnReducer,
    message: ChatReducer,
  },
});
