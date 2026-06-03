import mongoose, { Schema } from "mongoose";
import { QuizAnswers } from "../types/types";

const answersSchema = new Schema<QuizAnswers>({
  quizName: {
    type: String,
    required: true
  },
  answers: [
    {
      type: Object,
      required: true
    }
  ]
});

export const AnswersModel = mongoose.model("Answer", answersSchema);
