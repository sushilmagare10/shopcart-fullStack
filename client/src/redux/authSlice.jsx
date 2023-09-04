import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  isFetching: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.error = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    resgisterUser: (state, action) => {
      const { name, email, password } = action.payload;

      // Update the state with the user information for successful registration
      state.currentUser = { name, email, password };
      state.isLoggedIn = true;
    },
    resgisterUserFailure: (state) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  resgisterUser,
  resgisterUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
