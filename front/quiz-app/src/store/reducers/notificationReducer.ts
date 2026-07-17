import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    changeNotification(_state, action) {
      return action.payload;
    }
  }
});

export const setTimedNotification = (message: string, time: number = 5) => {
  return async (dispatch: AppDispatch) => {
    dispatch(changeNotification(message));
    setTimeout(() => {
      dispatch(changeNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
export const { changeNotification } = notificationSlice.actions;
