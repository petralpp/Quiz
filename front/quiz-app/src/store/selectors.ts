import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Quiz } from "../types";

export const selectEntertainmentQuizzes = (state: RootState) =>
  state.quizzes.entertainmentList;

export const selectEducationQuizzes = (state: RootState) =>
  state.quizzes.educationList;

export const selectGeneralQuizzes = (state: RootState) => state.quizzes.generalList;

export const selectUser = (state: RootState) => state.user.user;

export const selectUserQuizzes = (state: RootState) => state.user.quizzes;

export const notification = (state: RootState) => state.notification;

const selectCategoryList = (category: string) => (state: RootState) =>
  ({
    Education: state.quizzes.educationList,
    Entertainment: state.quizzes.entertainmentList,
    General: state.quizzes.generalList,
    User: state.user.quizzes
  })[category] ?? [];

export const selectGroupedQuizzesByCategory = (category: string) =>
  createSelector([selectCategoryList(category)], (quizzes) => {
    const grouped: Record<string, Quiz[]> = {};

    for (const quiz of quizzes) {
      grouped[quiz.subcategory] ??= [];
      grouped[quiz.subcategory].push(quiz);
    }
    return grouped;
  });

export const selectQuizMap = createSelector(
  [
    (state) => state.quizzes.educationList,
    (state) => state.quizzes.entertainmentList,
    (state) => state.quizzes.generalList,
    (state) => state.user.quizzes
  ],
  (edu, ent, gen, user) => {
    const map: Record<string, Quiz> = {};

    [...edu, ...ent, ...gen, ...user].forEach((quiz) => {
      map[quiz._id] = quiz;
    });

    return map;
  }
);
