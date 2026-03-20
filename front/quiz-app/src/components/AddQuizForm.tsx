import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import type { QuizQuestion } from "./AddQuestionForm";

export type Quiz = {
  title: string;
  category: string;
  questions: QuizQuestion[];
};

type AddQuizFormProps = {
  onSubmitQuiz: (quiz: Quiz) => void;
};

export default function AddQuizForm({ onSubmitQuiz }: AddQuizFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const handleAddQuestion = (question: QuizQuestion) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid =
    title.trim().length > 0 && category.trim().length > 0 && questions.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmitQuiz({
      title: title.trim(),
      category: category.trim(),
      questions
    });

    // Reset form
    setTitle("");
    setCategory("");
    setQuestions([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold">Create New Quiz</h1>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quiz title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Entertainment, Education"
          />
        </div>

        {/* Questions Preview */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Added Questions</h2>

            {questions.map((q, index) => (
              <div key={index} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{q.question}</p>
                    <ul className="list-disc ml-5 text-sm mt-2">
                      {q.choices.map((choice, i) => (
                        <li
                          key={i}
                          className={
                            choice === q.correctAnswer
                              ? "font-semibold text-green-600"
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
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Quiz */}
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

      {/* Question Form */}
      <AddQuestionForm onAddQuestion={handleAddQuestion} />
    </div>
  );
}
