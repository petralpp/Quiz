import mongoose, { Schema } from "mongoose";
import { User } from "../types/types";

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  passwordHash: {
    type: String,
    required: true
  }
});

export const UserModel = mongoose.model("User", userSchema);
