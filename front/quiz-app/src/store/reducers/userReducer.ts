import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import type { User, Quiz, NewQuiz } from "../../types";
import { setNotification } from "./notificationReducer";
import userService from "../../services/userService";
import storageService from "../../services/storageService";
import quizService from "../../services/quizService";
import { getErrorMessage } from "../../utils";

type UserState = {
  user: User | null;
  quizzes: Quiz[];
};

const initialState: UserState = {
  user: null,
  quizzes: []
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser() {
      return initialState;
    },
    setUserQuizList(state, action) {
      state.quizzes = action.payload;
    },
    addQuiz(state, action) {
      state.quizzes.push(action.payload);
    },
    deleteQuiz(state, action) {
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz._id !== action.payload)
      };
    }
  }
});

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: User = await userService.login(username, password);
      if (user) {
        storageService.addUser("quizAppUser", user);

        dispatch(setUser(user));
        return user;
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setNotification(message));
      return false;
    }
  };
};

export const registerUser = (username: string, password: string, name: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: User = await userService.register(username, password, name);
      if (user) {
        storageService.addUser("quizAppUser", user);

        dispatch(setUser(user));
        return true;
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setNotification(message));
      return false;
    }
  };
};

export const fetchUserQuizzes = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await quizService.getUserQuizzes(user);
      if (data) {
        dispatch(setUserQuizList(data));
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          dispatch(setNotification("Session expired"));
          dispatch(clearUser());
          storageService.removeUser("quizAppUser");
        } else {
          dispatch(setNotification(message));
        }
      } else {
        dispatch(setNotification(message));
      }
    }
  };
};

export const addUserQuiz = (newQuiz: NewQuiz, user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const quiz = await quizService.createQuiz(newQuiz, user);
      if (quiz) {
        dispatch(addQuiz(quiz));
        dispatch(setNotification(`New quiz ${quiz.name} added!`));
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setNotification(message));
    }
  };
};

export const deleteUserQuiz = (id: string, user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      await quizService.deleteQuiz(id, user);
      dispatch(deleteQuiz(id));
      dispatch(setNotification("Quiz deleted"));
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(setNotification(message));
    }
  };
};

export const { setUser, clearUser, setUserQuizList, addQuiz, deleteQuiz } =
  userSlice.actions;

export default userSlice.reducer;
