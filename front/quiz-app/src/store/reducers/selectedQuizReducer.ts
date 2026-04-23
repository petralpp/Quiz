import { createSlice } from "@reduxjs/toolkit";
import type { QuizDescription } from "../../types";

const initialState: QuizDescription = {
  category: "",
  subcategory: "",
  name: "",
  description: "",
  questions: 0
};

export const selectedQuizSlice = createSlice({
  name: "selectedQuiz",
  initialState,
  reducers: {
    setSelectedQuiz(_state, action) {
      console.log("Valitun quizzin reduceris, payload: ", action.payload);
      return action.payload;
    }
  }
});

export const { setSelectedQuiz } = selectedQuizSlice.actions;

export default selectedQuizSlice.reducer;
