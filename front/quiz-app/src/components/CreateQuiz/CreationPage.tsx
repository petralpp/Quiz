import { useNavigate, useParams } from "react-router-dom";

import type { NewQuiz, User } from "../../types";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUserQuiz, editUserQuiz } from "../../store/reducers/userReducer";
import { selectQuizById } from "../../store/selectors";

import QuizForm from "./QuizForm";
import PageNotFound from "../PageNotFound";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const quiz = useAppSelector(selectQuizById(id));

  const handleSubmit = async (newQuiz: NewQuiz, user: User) => {
    if (id && quiz) {
      dispatch(editUserQuiz(id, newQuiz, user));
      navigate("/create");
    } else {
      dispatch(addUserQuiz(newQuiz, user));
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
