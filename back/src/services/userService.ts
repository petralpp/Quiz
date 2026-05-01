import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { NewUser } from "../types";

const addUser = async (newUser: NewUser) => {
  const { username, name, password } = newUser;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();
  return savedUser;
};

export default { addUser };
