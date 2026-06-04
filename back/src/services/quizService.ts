import { QuizModel } from "../models/quizModel";
import { UserQuizModel } from "../models/userQuizModel";

const getQuizzes = async () => {
  const quizzes = await QuizModel.find({});
  return quizzes;
};

const getUserQuizzes = async (id: string) => {
  const userQuizzes = await UserQuizModel.find({ userId: id });
  return userQuizzes;
};

export default { getQuizzes, getUserQuizzes };
