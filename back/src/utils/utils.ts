import { z } from "zod";
import { NewUser, NewQuiz, CorrectAnswer } from "../types";
import { Request } from "express";

export const NewUserSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9åÅäÄöÖ]{4,15}$/),
  name: z.string().regex(/^[a-zA-ZåÅäÄöÖ]{3,20}$/),
  password: z.string().regex(/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)\S{14,25}$/)
});

export const QuestionSchema = z.object({
  question: z.string().min(1).max(150),
  choices: z.array(z.string().min(1).max(150))
});

export const NewQuizSchema = z.object({
  category: z.string().min(1).max(30),
  subcategory: z.string().min(1).max(30),
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(450),
  questions: z.array(QuestionSchema).min(1).max(30)
});

export const NewAnswersSchema = z.array(
  z.object({
    question: z.string().min(1).max(150),
    answer: z.string().min(1).max(150)
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
