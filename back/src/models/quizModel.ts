import mongoose, { Schema } from "mongoose";
import { Quiz } from "../types";

const quizSchema = new Schema<Quiz>({
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

export const QuizModel = mongoose.model("Quiz", quizSchema);
