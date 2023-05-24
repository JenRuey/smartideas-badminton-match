import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";

const rootReducer = combineReducers({
  app: appSlice.reducer,
});

const store = configureStore({ reducer: rootReducer });

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export default store;
