import express, { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { parseUser } from "../utils/utils";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: Registering the user");
  try {
    const { username, name, password } = req.body;
    const newUser = parseUser(username, name, password);
    const savedUser = await userService.addUser(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: Login user");
  try {
    const { username, password } = req.body;
    const validatedUser = await userService.validateUser(username, password);
    res.status(201).json(validatedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
