import { z } from "zod";
import { NewUser, NewQuiz, CorrectAnswer } from "../types";
import { Request } from "express";

export const NewUserSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9åÅäÄöÖ]{4,15}$/),
  name: z.string().regex(/^[a-zA-ZåÅäÄöÖ]{3,20}$/),
  password: z.string().regex(/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)\S{14,25}$/)
});

export const QuestionSchema = z.object({
  question: z.string(),
  choices: z.array(z.string())
});

export const NewQuizSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  name: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema)
});

export const CorrectAnswerSchema = z.object({
  question: z.string(),
  answer: z.string()
});

export const NewAnswersSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.string()
  })
);

export const parseUser = (
  username: unknown,
  name: unknown,
  password: unknown
): NewUser => {
  return NewUserSchema.parse({ username, name, password });
};

export const parseQuiz = (quiz: unknown): NewQuiz => {
  return NewQuizSchema.parse(quiz);
};

export const parseAnswers = (answers: unknown): CorrectAnswer[] => {
  return NewAnswersSchema.parse(answers);
};

export const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};
