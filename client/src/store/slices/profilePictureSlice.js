import { createSlice } from "@reduxjs/toolkit";
const initialProfilePicture = localStorage.getItem("profilePicture");
export const profilePictureSlice = createSlice({
  name: "profilePicture",
  initialState: {
    profilePicture: initialProfilePicture || null,
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
      localStorage.setItem("profilePicture", action.payload);
    },
  },
});
export const { setProfilePicture } = profilePictureSlice.actions;

export default profilePictureSlice.reducer;
