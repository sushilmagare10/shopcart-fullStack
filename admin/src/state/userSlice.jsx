import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],

  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // User registration reducer

    registerUserSuccess: (state, action) => {
      state.user = action.payload;

      state.isFetching = false;
      state.error = null;
    },
    registerUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateUserRoleSuccess: (state, action) => {
      state.user.role = action.payload.role;
      state.isFetching = false;
      state.error = null;
    },
    updateUserRoleFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFailure,
  updateUserRoleSuccess,
  updateUserRoleFailure,
  getUsersSuccess,
  getUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
