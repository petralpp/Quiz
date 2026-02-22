import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";
//import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Quiz[] = [];

export const educationSlice = createSlice({
  name: "educationList",
  initialState,
  reducers: {
    setEducationList(_state, action) {
      return action.payload;
    }
  }
});

export const { setEducationList } = educationSlice.actions;

export default educationSlice.reducer;
