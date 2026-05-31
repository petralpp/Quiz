import QuizForm from "./QuizForm";
import type { NewQuiz, User } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { addUserQuiz } from "../../store/reducers/userReducer";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (newQuiz: NewQuiz, user: User) => {
    dispatch(addUserQuiz(newQuiz, user));
  };
  return (
    <div className="h-max py-4 px-2 bg-white">
      <QuizForm onSubmitQuiz={handleSubmit} />
    </div>
  );
};

export default CreationPage;
