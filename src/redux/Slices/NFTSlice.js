import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SingleNFT: {},
  userDetail:{},
};

export const NFTSlice = createSlice({
  name: "SingleNFT",
  initialState,
  reducers: {
    SetSingleNFT: (state, action) => {

      state.SingleNFT = action.payload;
    },
    userDetailed: (state, action) => {

      state.userDetail = action.payload;
    },
  },
});

export const { SetSingleNFT,userDetailed } = NFTSlice.actions;

export default NFTSlice.reducer;
