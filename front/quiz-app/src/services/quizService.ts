import axios from "axios";
import type { QuizAnswers, Quiz, NewQuiz, User } from "../types";
import { createNewAnswers, createNewQuiz } from "./utils";

const getAllQuizzes = async () => {
  const response = await axios.get<Quiz[]>("/api/quiz");
  return response.data;
};

const getUserQuizzes = async (user: User) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const response = await axios.get("/api/quiz/userquizzes", config);
  return response.data;
};

const getAnswers = async (id: string) => {
  const response = await axios.get<QuizAnswers>(`/api/quiz/answers/${id}`);
  return response.data;
};

const createQuiz = async (quiz: NewQuiz, user: User) => {
  const modifiedQuiz = createNewQuiz(quiz);
  const modifiedAnswers = createNewAnswers(quiz.questions);

  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  const response = await axios.post(
    "/api/quiz/",
    {
      quiz: modifiedQuiz,
      answers: modifiedAnswers
    },
    config
  );
  return response.data;
};

export default { getAllQuizzes, getUserQuizzes, getAnswers, createQuiz };
