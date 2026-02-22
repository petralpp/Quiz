import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch } from "@reduxjs/toolkit";
import quizService from "../../services/quizService";
import type { CorrectAnswer } from "../../types";

type State = {
  playerAnswers: string[];
  rightAnswers: CorrectAnswer[];
};

const initialState: State = {
  playerAnswers: [],
  rightAnswers: []
};

export const answersSlice = createSlice({
  name: "selectedQuiz",
  initialState,
  reducers: {
    setPlayerAnswer(state, action) {
      return {
        ...state,
        playerAnswers: state.playerAnswers.concat(action.payload)
      };
    },
    setRightAnswers(state, action) {
      return { ...state, rightAnswers: action.payload };
    },
    resetAnswers() {
      return initialState;
    }
  }
});

export const getRightAnswers = (id: string) => {
  return async (dispatch: Dispatch) => {
    const answerData = await quizService.getAnswers(id);
    dispatch(setRightAnswers(answerData?.answers));
  };
};

export const { setPlayerAnswer, setRightAnswers, resetAnswers } =
  answersSlice.actions;

export default answersSlice.reducer;
