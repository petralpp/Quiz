import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";

const addUser = async (username: string, name: string, password: string) => {
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

export default { addUser };
