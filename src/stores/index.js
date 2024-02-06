import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
  },
});