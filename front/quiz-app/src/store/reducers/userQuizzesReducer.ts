import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";

const initialState: Quiz[] = [];

export const userQuizzesSlice = createSlice({
  name: "userQuizList",
  initialState,
  reducers: {
    setUserQuizList(_state, action) {
      console.log("Reducerissa, action payload: ", action.payload);
      return action.payload;
    }
  }
});

export const { setUserQuizList } = userQuizzesSlice.actions;

export default userQuizzesSlice.reducer;
