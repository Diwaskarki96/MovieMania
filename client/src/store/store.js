import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/snackbarSlice";
import profilePictureReducer from "./slices/profilePictureSlice";
export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    profilePicture: profilePictureReducer,
  },
});
