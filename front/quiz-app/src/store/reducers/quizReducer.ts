import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";
import type { AppDispatch } from "../store";
import { setNotification } from "./notificationReducer";
import quizService from "../../services/quizService";
import { getErrorMessage } from "../../utils";

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

export const fetchQuizzes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const quizzes = await quizService.getAllQuizzes();
      if (quizzes) {
        dispatch(setQuizzes(quizzes));
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setNotification(message));
    }
  };
};

export const { setQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;
