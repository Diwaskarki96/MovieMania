import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "success",
    message: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload || "Something went wrong";
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openErrorSnackbar, openSuccessSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
