import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";

type State = {
  isActive: boolean;
  quiz: Quiz;
};

const initialState: State = {
  isActive: false,
  quiz: {
    _id: "",
    category: "",
    subcategory: "",
    name: "",
    description: "",
    questions: [],
    answersId: ""
  }
};

export const activeQuizSlice = createSlice({
  name: "selectedQuiz",
  initialState,
  reducers: {
    startQuiz(_state, action) {
      return {
        isActive: true,
        quiz: action.payload
      };
    },
    endQuiz() {
      return initialState;
    }
  }
});

export const { startQuiz, endQuiz } = activeQuizSlice.actions;

export default activeQuizSlice.reducer;
