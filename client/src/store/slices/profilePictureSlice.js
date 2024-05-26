import { createSlice } from "@reduxjs/toolkit";

export const profilePictureSlice = createSlice({
  name: "profilePicture",
  initialState: {
    profilePicture: null,
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
});
export const { setProfilePicture } = profilePictureSlice.actions;

export default profilePictureSlice.reducer;
