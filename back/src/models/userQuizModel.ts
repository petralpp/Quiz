import mongoose, { Schema } from "mongoose";
import { UserQuiz } from "../types";

const userQuizSchema = new Schema<UserQuiz>({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [
    {
      type: Object,
      required: true
    }
  ],
  answersId: {
    type: String,
    required: true
  }
});

export const UserQuizModel = mongoose.model("UserQuiz", userQuizSchema);
