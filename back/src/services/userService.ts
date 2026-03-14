import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { NewUser } from "../types";

const addUser = async (newUser: NewUser) => {
  const { username, name, password } = newUser;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({
    username,
    name,
    passwordHash,
    quizzes: []
  });

  const savedUser = await user.save();
  return savedUser;
};

const validateUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error("Username or password is incorrect");
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const secret = config.SECRET as string;

  const token = jwt.sign(userForToken, secret, { expiresIn: 60 * 60 });

  return { token, username: user.username, name: user.name };
};

export default { addUser, validateUser };
