export interface Quiz {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestions[];
  answersId: string;
}

export interface NewQuiz {
  user: User;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: Questions[];
}

export type Questions = NewQuestion | QuizQuestions;

export interface NewQuestion {
  question: string;
  choices: string[];
  correctAnswer: string;
}

export interface QuizQuestions {
  question: string;
  choices: string[];
}

export interface QuizAnswers {
  _id: string;
  quizName: string;
  answers: CorrectAnswer[];
}

export interface CorrectAnswer {
  question: string;
  answer: string;
}

export interface QuizDescription {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: number;
}

export interface User {
  token: string;
  username: string;
  name: string;
}
