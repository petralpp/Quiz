import { QuizModel } from "../models/quizModel";
import { AnswersModel } from "../models/answersModel";
import { UserQuizModel } from "../models/userQuizModel";

const getQuizzes = async () => {
  const quizzes = await QuizModel.find({});
  return quizzes;
};

const getUserQuizzes = async (id: string) => {
  const userQuizzes = await UserQuizModel.find({ userId: id });
  return userQuizzes;
};

const getAnswers = async (id: string) => {
  const answers = await AnswersModel.findById(id);
  return answers;
};

export default { getQuizzes, getUserQuizzes, getAnswers };
