import { z } from "zod";
import { NewUser } from "../types";

export const NewUserSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]{4,15}$/),
  name: z.string().regex(/^[a-zA-ZåÅäÄöÖ]{3,20}$/),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{14,25}$/)
});

export const NewQuizSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  name: z.string(),
  description: z.string(),
  questions: z.array,
  answersId: z.string()
});

export const parseUser = (
  username: unknown,
  name: unknown,
  password: unknown
): NewUser => {
  return NewUserSchema.parse({ username, name, password });
};
