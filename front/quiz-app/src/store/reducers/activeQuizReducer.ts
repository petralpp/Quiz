import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";

type State = {
  isActive: boolean;
  quiz: Quiz;
  playerAnswers: string[];
  score: number;
};

const initialState: State = {
  isActive: false,
  quiz: {
    _id: "",
    category: "",
    subcategory: "",
    name: "",
    description: "",
    questions: []
  },
  playerAnswers: [],
  score: 0
};

export const activeQuizSlice = createSlice({
  name: "selectedQuiz",
  initialState,
  reducers: {
    startQuiz(_state, action) {
      return {
        isActive: true,
        quiz: action.payload,
        playerAnswers: [],
        score: 0
      };
    },
    endQuiz() {
      return initialState;
    },
    resetQuiz(state) {
      return {
        ...state,
        playerAnswers: [],
        score: 0
      };
    },
    setPlayerAnswer(state, action) {
      return {
        ...state,
        playerAnswers: state.playerAnswers.concat(action.payload)
      };
    },
    updateScore(state) {
      state.score = state.score += 1;
    }
  }
});

export const { startQuiz, endQuiz, setPlayerAnswer, resetQuiz, updateScore } =
  activeQuizSlice.actions;

export default activeQuizSlice.reducer;
