import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OpenMenu: false,
};

export const MobileSlice = createSlice({
  name: "MobileSlice",
  initialState,
  reducers: {
    UpdateMobileMenu: (state, action) => {
      state.OpenMenu = action.payload;
    },
  },
});

export const { UpdateMobileMenu } = MobileSlice.actions;

export default MobileSlice.reducer;
