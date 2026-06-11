import QuizForm from "./QuizForm";
import type { NewQuiz, User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUserQuiz } from "../../store/reducers/userReducer";
import { useParams } from "react-router-dom";
import { selectQuizById } from "../../store/selectors";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const quiz = useAppSelector(selectQuizById(id));
  const handleSubmit = async (newQuiz: NewQuiz, user: User) => {
    dispatch(addUserQuiz(newQuiz, user));
  };

  return (
    <div className="h-max py-4 px-2 bg-white">
      <QuizForm onSubmitQuiz={handleSubmit} initQuiz={quiz} />
    </div>
  );
};

export default CreationPage;
