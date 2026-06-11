import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Quiz } from "../types";

export const selectEntertainmentQuizzes = (state: RootState) =>
  state.quizzes.entertainmentList;

export const selectEducationQuizzes = (state: RootState) =>
  state.quizzes.educationList;

export const selectUser = (state: RootState) => state.user.user;

export const selectUserQuizzes = (state: RootState) => state.user.quizzes;

export const selectQuizById = (id: string | undefined) => (state: RootState) => {
  return state.user.quizzes.find((q) => q._id === id);
};

export const notification = (state: RootState) => state.notification;

export const selectGroupedQuizzesByCategory = (category: string) =>
  createSelector(
    [
      (state: RootState) => {
        if (category === "Entertainment") {
          return state.quizzes.entertainmentList;
        } else if (category === "Education") {
          return state.quizzes.educationList;
        } else {
          return state.user.quizzes;
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
