import { combineReducers, configureStore } from "@reduxjs/toolkit";
import entertainmentReducer from "./reducers/entertainmentReducer";
import educationReducer from "./reducers/educationReducer";
import selectedQuizReducer from "./reducers/selectedQuizReducer";
import activeQuizReducer from "./reducers/activeQuizReducer";
import answersReducer from "./reducers/answersReducer";

const rootReducer = combineReducers({
  entertainmentQuizzes: entertainmentReducer,
  educationQuizzes: educationReducer,
  selectedQuiz: selectedQuizReducer,
  activeQuiz: activeQuizReducer,
  answers: answersReducer
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
