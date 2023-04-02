import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: "",
  },

  reducers: {
    registerPending(state) {
      state.loading = true;
      state.error = "";
    },

    register(state, action) {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    },

    registerFail(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    loginPending(state) {
      state.loading = true;
      state.error = "";
    },

    login(state, action) {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    },

    loginFail(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    logout(state) {
      state.loading = false;
      state.error = "";
      state.user = null;
    },

    userProfile(state, action) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
