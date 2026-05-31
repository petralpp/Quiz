import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import quizService from "../services/quizService";
import { getTokenFrom, parseAnswers, parseQuiz } from "../utils/utils";
import config from "../utils/config";
import { UserModel } from "../models/userModel";
import { AnswersModel } from "../models/answersModel";
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

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getTokenFrom(req);
    if (!auth) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const secret = config.SECRET as string;
    const decodedToken = jwt.verify(auth, secret) as jwt.JwtPayload;
    if (!decodedToken.id) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      res.status(400).json({ error: "UserId missing or not valid" });
      return;
    }

    const { quiz, answers } = req.body;
    const validatedQuiz = parseQuiz(quiz);
    const validatedAnswers = parseAnswers(answers);

    const newAnswers = new AnswersModel({
      quizName: quiz.name,
      answers: validatedAnswers
    });
    const savedAnswers = await newAnswers.save();

    const newQuiz = new UserQuizModel({
      ...validatedQuiz,
      userId: user._id,
      answersId: savedAnswers._id
    });
    let savedQuiz;
    try {
      savedQuiz = await newQuiz.save();
    } catch (error) {
      await AnswersModel.findByIdAndDelete(savedAnswers._id);
      res.status(500).json({ error: "Something went wrong when saving the quiz" });
      return;
    }

    res.status(201).json(savedQuiz);
  } catch (error: unknown) {
    next(error);
  }
});

router.get(
  "/answers/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Backend: fetching answers for quiz");
      const id = req.params.id;
      const answers = await quizService.getAnswers(id);
      if (!answers) {
        res.status(404).json({ error: "Quiz not found" });
      } else {
        res.send(answers);
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.get(
  "/userquizzes",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Backend: fetching quizzes for user");
      const auth = getTokenFrom(req);
      if (!auth) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const secret = config.SECRET as string;
      const decodedToken = jwt.verify(auth, secret) as jwt.JwtPayload;
      if (!decodedToken.id) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }
      const user = await UserModel.findById(decodedToken.id);

      if (!user) {
        res.status(400).json({ error: "UserId missing or not valid" });
        return;
      }

      const userQuizzes = await quizService.getUserQuizzes(user._id.toString());
      res.send(userQuizzes);
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.delete(
  "/userquizzes/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = getTokenFrom(req);
      if (!auth) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }

      const secret = config.SECRET as string;
      const decodedToken = jwt.verify(auth, secret) as jwt.JwtPayload;
      if (!decodedToken.id) {
        res.status(401).json({ error: "Invalid token" });
        return;
      }
      const user = await UserModel.findById(decodedToken.id);

      if (!user) {
        res.status(400).json({ error: "UserId missing or not valid" });
        return;
      }
      const id = req.params.id;
      await UserQuizModel.findOneAndDelete({ _id: id, userId: user._id });
      res.status(204).end();
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default router;
