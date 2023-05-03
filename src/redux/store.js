import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import MobileSlice from "./Slices/MobileSlice";
import NFTSlice from "./Slices/NFTSlice";
import UserAuth from "./Slices/UserAuth";
// import storageSession from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  mobile: MobileSlice,
  nft: NFTSlice,
  UserAuth: UserAuth,

});
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)