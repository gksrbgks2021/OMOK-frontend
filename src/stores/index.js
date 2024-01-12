import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});