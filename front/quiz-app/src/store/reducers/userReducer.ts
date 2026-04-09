import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import userService from "../../services/userService";
import storageService from "../../services/storageService";
import type { User } from "../../types";
import { setNotification } from "./notificationReducer";
import { AxiosError } from "axios";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null
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
    }
  }
});

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: User = await userService.login(username, password);
      if (user) {
        storageService.addUser("quizAppUser", user);
        //blogService.setToken(userObject.token)

        dispatch(setUser(user));
        return true;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(setNotification(error.response?.data.error, 5));
        return false;
      } else if (error instanceof Error) {
        dispatch(setNotification(error.message, 5));
        return false;
      }
      console.log("Error: ", error);
    }
  };
};

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
