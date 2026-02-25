import mongoose, { Schema } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

export const UserModel = mongoose.model("User", userSchema);
