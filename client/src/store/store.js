import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
