import mongoose, { Schema } from "mongoose";
import { Quiz } from "../types/types";

const userQuizSchema = new Schema<Quiz>({
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
  ]
});

export const UserQuizModel = mongoose.model("UserQuiz", userQuizSchema);
