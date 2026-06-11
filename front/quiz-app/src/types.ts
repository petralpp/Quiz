export interface Quiz {
  _id: string;
  userId?: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface NewQuiz {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizDescription {
  _id: string;
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
