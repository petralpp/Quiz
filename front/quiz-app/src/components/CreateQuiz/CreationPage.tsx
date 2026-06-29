import { useNavigate, useParams } from "react-router-dom";

import type { NewQuiz } from "../../types";

import { useAppDispatch } from "../../store/hooks";
import { addUserQuiz, editUserQuiz } from "../../store/reducers/userReducer";
import { useQuiz } from "../../hooks";

import QuizForm from "./QuizForm";
import PageNotFound from "../PageNotFound";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const quiz = useQuiz(id);

  const handleSubmit = async (newQuiz: NewQuiz) => {
    if (id && quiz) {
      dispatch(editUserQuiz(id, newQuiz));
      navigate("/create");
    } else {
      dispatch(addUserQuiz(newQuiz));
    }
  };

  if (id && !quiz) {
    return <PageNotFound />;
  }

  return (
    <div className="h-max py-4 px-2 bg-white">
      <QuizForm onSubmitQuiz={handleSubmit} initQuiz={quiz} />
    </div>
  );
};

export default CreationPage;
