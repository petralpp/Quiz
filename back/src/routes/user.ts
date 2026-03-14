import express, { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { parseUser } from "../utils/utils";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: Registering the user");
  const { username, name, password } = req.body;

  try {
    const newUser = parseUser(username, name, password);

    console.log("Parsettu käyttäjä: ", newUser);
    const savedUser = await userService.addUser(username, name, password);
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
