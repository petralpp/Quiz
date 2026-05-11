import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quizReducer";
import userReducer from "./reducers/userReducer";
import userQuizzesReducer from "./reducers/userQuizzesReducer";
import selectedQuizReducer from "./reducers/selectedQuizReducer";
import activeQuizReducer from "./reducers/activeQuizReducer";
import answersReducer from "./reducers/answersReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  quizzes: quizReducer,
  userInfo: userReducer,
  userQuizzes: userQuizzesReducer,
  selectedQuiz: selectedQuizReducer,
  activeQuiz: activeQuizReducer,
  answers: answersReducer,
  notification: notificationReducer
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
