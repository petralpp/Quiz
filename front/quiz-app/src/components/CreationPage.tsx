import { Link } from "react-router-dom";
import AddQuizForm from "./AddQuizForm";
import type { NewQuiz } from "../types";
import { useState } from "react";
import quizService from "../services/quizService";

const CreationPage = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = (newQuiz: NewQuiz) => {
    quizService.createQuiz(newQuiz);
    setMessage(`Quiz '${newQuiz.name}' saved!`);
    setTimeout(() => {
      setMessage("");
    }, 10000);
  };
  return (
    <div className="h-max py-4 px-2 bg-white">
      <Link to="/">
        <button className="btn-blue lg:float-left">Back</button>
      </Link>
      {message !== "" && (
        <p className="bg-green-500 text-white rounded text-center m-auto w-1/3 px-4 py-2">
          {message}
        </p>
      )}
      <AddQuizForm onSubmitQuiz={handleSubmit} />
    </div>
  );
};

export default CreationPage;
