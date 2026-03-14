import mongoose from "mongoose";

export interface Quiz {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: object[];
  answersId: string;
}

export interface QuizAnswers {
  quizName: string;
  answers: object[];
}

export interface User {
  username: string;
  name: string;
  passwordHash: string;
  quizzes: Array<mongoose.Schema.Types.ObjectId>;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
}
