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

/*
quizSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  }
});
*/

export const QuizModel = mongoose.model("Quiz", quizSchema);
