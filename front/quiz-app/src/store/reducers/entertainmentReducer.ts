import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";
//import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Quiz[] = [];

export const entertainmentSlice = createSlice({
  name: "entertainmentList",
  initialState,
  reducers: {
    setEntertainmentList(_state, action) {
      return action.payload;
    }
  }
});

export const { setEntertainmentList } = entertainmentSlice.actions;

export default entertainmentSlice.reducer;
