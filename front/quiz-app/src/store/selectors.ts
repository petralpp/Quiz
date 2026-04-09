import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Quiz } from "../types";

export const selectEntertainmentQuizzes = (state: RootState) =>
  state.entertainmentQuizzes;

export const selectEducationQuizzes = (state: RootState) => state.educationQuizzes;

export const selectUser = (state: RootState) => state.userInfo.user;

export const selectUserQuizzes = (state: RootState) => state.userQuizzes;

export const selectGroupedQuizzesByCategory = (category: string) =>
  createSelector(
    [
      (state: RootState) => {
        if (category === "Entertainment") {
          return state.entertainmentQuizzes;
        } else if (category === "Education") {
          return state.educationQuizzes;
        } else {
          return state.userQuizzes;
        }
      }
    ],
    (quizzes) => {
      const grouped: Record<string, Quiz[]> = {};

      for (const quiz of quizzes) {
        grouped[quiz.subcategory] ??= [];
        grouped[quiz.subcategory].push(quiz);
      }

      return grouped;
    }
  );
