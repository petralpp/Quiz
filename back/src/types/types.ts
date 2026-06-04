import mongoose from "mongoose";

export interface Quiz {
  _id: mongoose.Types.ObjectId;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestions[];
}

export interface UserQuiz {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestions[];
}

export interface QuizQuestions {
  question: string;
  choices: string[];
  answer: string;
}

export interface NewQuiz {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: object[];
}

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  name: string;
  passwordHash: string;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
}

export interface Token {
  username: string;
  id: string;
}
