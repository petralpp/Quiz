import type {
  CorrectAnswer,
  NewQuestion,
  NewQuiz,
  Questions,
  QuizQuestions
} from "../types";

export const createNewAnswers = (questionArr: Questions[]) => {
  const answers: CorrectAnswer[] = [];
  const questions: NewQuestion[] = questionArr as NewQuestion[];
  for (const elem of questions) {
    answers.push({ question: elem.question, answer: elem.correctAnswer });
  }
  return answers;
};

export const createNewQuiz = (newQuiz: NewQuiz) => {
  const questions: QuizQuestions[] = [];

  if (!newQuiz.questions) return;
  for (const elem of newQuiz.questions) {
    questions.push({ question: elem.question, choices: elem.choices });
  }

  return { ...newQuiz, questions: questions };
};
