import { createSlice } from "@reduxjs/toolkit";
import type { Quiz, User } from "../../types";
import type { AppDispatch } from "../store";
import quizService from "../../services/quizService";
import { setNotification } from "./notificationReducer";

const initialState: Quiz[] = [];

export const userQuizzesSlice = createSlice({
  name: "userQuizList",
  initialState,
  reducers: {
    setUserQuizList(_state, action) {
      return action.payload;
    },
    clearUserQuizList() {
      return initialState;
    },
    addUserQuiz(state, action) {
      return state.concat(action.payload);
    },
    deleteQuiz(state, action) {
      return state.filter((quiz) => quiz._id !== action.payload);
    }
  }
});

export const fetchUserQuizzes = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await quizService.getUserQuizzes(user);
      if (data) {
        dispatch(setUserQuizList(data));
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };
};

export const deleteUserQuiz = (id: string, user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      await quizService.deleteQuiz(id, user);
      dispatch(deleteQuiz(id));
      dispatch(setNotification("Quiz deleted", 5));
    } catch (error: unknown) {
      console.log(error);
    }
  };
};

export const { setUserQuizList, clearUserQuizList, addUserQuiz, deleteQuiz } =
  userQuizzesSlice.actions;

export default userQuizzesSlice.reducer;
