import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import type { NewQuiz, NewQuestion } from "../types";

interface Props {
  onSubmitQuiz: (quiz: NewQuiz) => void;
}

const AddQuizForm = ({ onSubmitQuiz }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<NewQuestion[]>([]);

  const addQuestion = (question: NewQuestion) => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid =
    title.trim().length > 0 &&
    category.trim().length > 0 &&
    subcategory.trim().length > 0 &&
    description.trim().length > 0 &&
    questions.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmitQuiz({
      name: title.trim(),
      description: description.trim(),
      category: category.trim(),
      subcategory: subcategory.trim(),
      questions
    });

    setTitle("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setQuestions([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
        <p>All fields are required</p>

        <div>
          <label className="block mb-1 font-medium">
            Quiz Title *
            <input
              type="text"
              value={title}
              maxLength={100}
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
              maxLength={100}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Entertainment, Education"
              required
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Subcategory *
            <input
              type="text"
              value={subcategory}
              maxLength={100}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Films, Psychology"
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Description *
            <input
              type="text"
              value={description}
              maxLength={1000}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the quiz"
            />
          </label>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Added Questions</h2>

            {questions.map((q, index) => (
              <div key={index} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between overflow-auto items-start">
                  <div>
                    <p className="font-medium">{q.question}</p>
                    <ul className="list-disc ml-5 text-sm mt-2">
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

                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white ${
            isValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Quiz
        </button>
      </form>

      <AddQuestionForm onAddQuestion={addQuestion} />
    </div>
  );
};

export default AddQuizForm;
