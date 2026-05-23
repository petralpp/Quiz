import { useState } from "react";
import { Link } from "react-router-dom";

import type { NewQuiz, NewQuestion, User } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

import QuestionForm from "./QuestionForm";

interface Props {
  onSubmitQuiz: (quiz: NewQuiz, user: User) => void;
}

const QuizForm = ({ onSubmitQuiz }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<NewQuestion[]>([]);
  const loggedInUser = useAppSelector(selectUser);

  const addQuestion = (question: NewQuestion) => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid =
    title.trim().length > 0 &&
    category.trim().length > 0 &&
    description.trim().length > 0 &&
    questions.length > 0 &&
    questions.length < 31;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    if (!loggedInUser) return;

    onSubmitQuiz(
      {
        name: title.trim(),
        description: description.trim(),
        category: "UserQuiz",
        subcategory: category.trim(),
        questions
      },
      loggedInUser
    );

    setTitle("");
    setDescription("");
    setCategory("");
    setQuestions([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-5 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-2xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
        <p>All fields are required</p>

        <div>
          <label className="block mb-1 font-medium">
            Quiz Title *
            <input
              type="text"
              value={title}
              maxLength={35}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz title"
              required
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Category *
            <input
              type="text"
              value={category}
              maxLength={30}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Music, Sports"
              required
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Description *
            <input
              type="text"
              value={description}
              maxLength={450}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the quiz"
            />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Questions *</h2>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <div key={index} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between wrap-anywhere items-start">
                  <div>
                    <p className="font-medium">
                      {index + 1}. {q.question}
                    </p>
                    <ul className="list-disc ml-5 mt-2">
                      {q.choices.map((choice, i) => (
                        <li
                          key={i}
                          className={
                            choice === q.correctAnswer
                              ? "font-semibold text-green-600 underline"
                              : ""
                          }
                        >
                          {choice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="btn btn-red mt-4 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="italic">No questions added</p>
          )}
        </div>

        {!loggedInUser && (
          <p className="text-red-700 text-xl">
            Only logged in users can create quizzes
          </p>
        )}
        <div className="flex justify-between">
          <Link to="/">
            <button className="btn btn-white border-2 border-solid">Cancel </button>
          </Link>
          <button
            type="submit"
            disabled={!isValid && !loggedInUser}
            className={
              isValid && loggedInUser ? "btn btn-blue" : "btn-blue-disabled"
            }
          >
            Save Quiz
          </button>
        </div>
      </form>
      {questions.length < 30 && <QuestionForm onAddQuestion={addQuestion} />}
    </div>
  );
};

export default QuizForm;
