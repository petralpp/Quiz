import { createSlice } from "@reduxjs/toolkit";
import type { Quiz } from "../../types";
import type { AppDispatch } from "../store";
import { changeNotification, setTimedNotification } from "./notificationReducer";
import quizService from "../../services/quizService";
import { getErrorMessage } from "../../utils";

type State = {
  educationList: Quiz[];
  entertainmentList: Quiz[];
  generalList: Quiz[];
};

const initialState: State = {
  educationList: [],
  entertainmentList: [],
  generalList: []
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(_state, action) {
      const educationList: Quiz[] = [];
      const entertainmentList: Quiz[] = [];
      const generalList: Quiz[] = [];
      action.payload.forEach((quiz: Quiz) => {
        switch (quiz.category) {
          case "Education":
            educationList.push(quiz);
            break;
          case "Entertainment":
            entertainmentList.push(quiz);
            break;
          default:
            generalList.push(quiz);
            break;
        }
      });
      return { educationList, entertainmentList, generalList };
    }
  }
});

export const fetchQuizzes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(changeNotification("Fetching quizzes..."));
      const quizzes = await quizService.getAllQuizzes();
      if (quizzes) {
        dispatch(setQuizzes(quizzes));
        dispatch(changeNotification(null));
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setTimedNotification(message));
    }
  };
};

export const { setQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;
