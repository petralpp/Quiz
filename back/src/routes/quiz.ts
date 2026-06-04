import express, { Request, Response, NextFunction } from "express";
import quizService from "../services/quizService";
import { parseQuiz } from "../utils/utils";
import { extractToken, extractUser } from "../utils/middleware";
import { UserQuizModel } from "../models/userQuizModel";

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: fetching all quizzes!");
  try {
    const quizzes = await quizService.getQuizzes();
    res.send(quizzes);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  extractToken,
  extractUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const quiz = req.body;
        const validatedQuiz = parseQuiz(quiz);

        const newQuiz = new UserQuizModel({
          ...validatedQuiz,
          userId: req.user._id
        });
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.get(
  "/userquizzes",
  extractToken,
  extractUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Backend: fetching quizzes for user");

      if (req.user) {
        const userQuizzes = await quizService.getUserQuizzes(
          req.user._id.toString()
        );
        res.send(userQuizzes);
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.delete(
  "/userquizzes/:id",
  extractToken,
  extractUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const id = req.params.id;
        await UserQuizModel.findOneAndDelete({ _id: id, userId: req.user._id });
        res.status(204).end();
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default router;
