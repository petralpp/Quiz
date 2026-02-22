import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Quiz } from "../types";

export const selectEntertainmentQuizzes = (state: RootState) =>
  state.entertainmentQuizzes;

export const selectEducationQuizzes = (state: RootState) => state.educationQuizzes;

export const selectGroupedQuizzesByCategory = (category: string) =>
  createSelector(
    [
      (state: RootState) =>
        category === "Entertainment"
          ? state.entertainmentQuizzes
          : state.educationQuizzes
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
