import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import userService from "../../services/userService";
import storageService from "../../services/storageService";
import type { User } from "../../types";

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
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  };
};

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
