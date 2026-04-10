import axios from "axios";
import type { QuizAnswers, Quiz, NewQuiz } from "../types";
import { createNewAnswers, createNewQuiz } from "./utils";

const getAllQuizzes = async () => {
  try {
    const response = await axios.get<Quiz[]>("/api/quiz");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

const getAnswers = async (id: string) => {
  try {
    const response = await axios.get<QuizAnswers>(`/api/quiz/answers/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

const createQuiz = async (quiz: NewQuiz) => {
  const modifiedQuiz = createNewQuiz(quiz);
  const modifiedAnswers = createNewAnswers(quiz.questions);
  console.log("Muokattu quiz: ", modifiedQuiz);
  console.log("Muokatut vastaukset: ", modifiedAnswers);
  const response = await axios.post("/api/quiz/", {
    quiz: modifiedQuiz,
    answers: modifiedAnswers
  });
  return response.data;
};

export default { getAllQuizzes, getAnswers, createQuiz };
