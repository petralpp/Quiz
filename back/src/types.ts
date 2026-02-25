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
  quizzes: Array;
}
