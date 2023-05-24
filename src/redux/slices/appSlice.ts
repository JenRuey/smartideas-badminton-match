import { createSlice } from "@reduxjs/toolkit";

type AppInitStateType = {
  version: number;
};

const appInitState: AppInitStateType = {
  version: 1.0,
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitState,
  reducers: {},
  extraReducers(builder) {},
});

export default appSlice;
