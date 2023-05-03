import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  userId: ''
};

export const UserAuth = createSlice({
  name: "UserAuth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      console.log('userauth action ', action.payload)
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;

    },
  },
});

export const { updateAuth } = UserAuth.actions;

export default UserAuth.reducer;
