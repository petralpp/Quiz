import mongoose from "mongoose";

export interface Quiz {
  _id: mongoose.Types.ObjectId;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestions[];
  answersId: string;
}

export interface QuizQuestions {
  question: string;
  choices: string[];
}

export interface NewQuiz {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: object[];
}

export interface QuizAnswers {
  _id: mongoose.Types.ObjectId;
  quizName: string;
  answers: CorrectAnswer[];
}

export interface CorrectAnswer {
  question: string;
  answer: string;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  name: string;
  passwordHash: string;
  quizzes: Array<mongoose.Types.ObjectId>;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
}
