import { z } from "zod";
import { NewUser, NewQuiz } from "../types/types";

export const NewUserSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9åÅäÄöÖ]{4,15}$/),
  name: z.string().regex(/^[a-zA-ZåÅäÄöÖ]{3,20}$/),
  password: z.string().regex(/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)\S{14,25}$/)
});

export const QuestionSchema = z.object({
  question: z.string().min(1).max(150),
  choices: z
    .array(z.string().min(1).max(150))
    .refine((items) => new Set(items).size === items.length, {
      message: "Answer choices for question have to be unique"
    }),
  answer: z.string().min(1).max(150)
});

export const NewQuizSchema = z.object({
  category: z.string().min(1).max(30),
  subcategory: z.string().min(1).max(30),
  name: z.string().min(1).max(35),
  description: z.string().min(1).max(450),
  questions: z.array(QuestionSchema).min(1).max(30)
});

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
