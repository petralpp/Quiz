import { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import type { User, Quiz } from "../../types";
import { setNotification } from "./notificationReducer";
import userService from "../../services/userService";
import storageService from "../../services/storageService";
import quizService from "../../services/quizService";

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
      if (error instanceof AxiosError) {
        if (error.response) {
          dispatch(setNotification(error.response?.data.error, 5));
        } else if (error.request) {
          dispatch(setNotification(error.request, 5));
        } else {
          dispatch(setNotification(error.message, 5));
        }
        return false;
      } else if (error instanceof Error) {
        dispatch(setNotification(error.message, 5));
        return false;
      }
      console.log("Error: ", error);
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
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        if (error.response) {
          dispatch(setNotification(error.response.data.error, 5));
        } else if (error.request) {
          dispatch(setNotification(error.request, 5));
        } else {
          dispatch(setNotification(error.message, 5));
        }
        return false;
      } else if (error instanceof Error) {
        dispatch(setNotification(error.message, 5));
        return false;
      } else {
        dispatch(setNotification("Something went wrong", 5));
        return false;
      }
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
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          dispatch(setNotification("Session expired", 6));
          dispatch(clearUser());
          storageService.removeUser("quizAppUser");
        } else {
          dispatch(
            setNotification("Something went wrong when fetching user quizzes", 6)
          );
        }
      } else if (error instanceof Error) {
        dispatch(setNotification(error.message, 5));
        return false;
      } else {
        dispatch(setNotification("Something went wrong", 5));
        return false;
      }
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

export const { setUser, clearUser, setUserQuizList, addQuiz, deleteQuiz } =
  userSlice.actions;

export default userSlice.reducer;
