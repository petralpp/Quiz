import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userService from "../services/userService";
import config from "../utils/config";
import { parseUser } from "../utils/utils";
import { UserModel } from "../models/userModel";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: Registering the user");
  try {
    const { username, name, password } = req.body;
    const newUser = parseUser(username, name, password);
    const savedUser = await userService.addUser(newUser);

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id
    };
    const secret = config.SECRET as string;
    const token = jwt.sign(userForToken, secret, { expiresIn: 60 * 60 });

    res
      .status(201)
      .json({ token, username: savedUser.username, name: savedUser.name });
  } catch (error: unknown) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Backend: Login user");
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "Invalid username or password"
      });
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };
    const secret = config.SECRET as string;
    const token = jwt.sign(userForToken, secret, { expiresIn: 60 * 60 });

    res.status(201).json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

export default router;
