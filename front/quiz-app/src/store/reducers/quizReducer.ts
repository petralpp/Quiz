import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";

type State = {
  educationList: Quiz[];
  entertainmentList: Quiz[];
};

const initialState: State = {
  educationList: [],
  entertainmentList: []
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(_state, action) {
      const educationList: Quiz[] = [];
      const entertainmentList: Quiz[] = [];
      action.payload.forEach((quiz: Quiz) =>
        quiz.category === "Education"
          ? educationList.push(quiz)
          : entertainmentList.push(quiz)
      );
      return { educationList, entertainmentList };
    }
  }
});

export const { setQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;
