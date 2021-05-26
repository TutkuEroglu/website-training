import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginz: (state, action) => {
      state.user = action.payload;
    },
    logoutz: (state) => {
      state.user = null;
    },
    editz: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginz, logoutz, editz } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
