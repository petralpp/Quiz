export interface Quiz {
  category: string;
  subcategory: string;
  name: string;
  description: string;
  questions: object[];
  answersId: string;
}
/*
export interface QuizQuestions {
  question: string;
  choices: string[];
}*/

/*
export interface CorrectAnswer {
  question: string;
  answer: string;
}*/

export interface QuizAnswers {
  quizName: string;
  answers: object[];
}
