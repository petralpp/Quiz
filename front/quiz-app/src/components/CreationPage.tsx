import { Link } from "react-router-dom";
import AddQuizForm from "./AddQuizForm";

const CreationPage = () => {
  const paska = () => {
    console.log("moi");
  };
  return (
    <div className="h-max py-4 px-2 bg-white">
      <Link to="/">
        <button className="btn-blue">Back</button>
      </Link>
      <h1>Create a quiz</h1>
      <p>
        This feature is still in progress. The quiz will be saved to your browser's
        local storage
      </p>
      <AddQuizForm onSubmitQuiz={paska} />
    </div>
  );
};

export default CreationPage;
