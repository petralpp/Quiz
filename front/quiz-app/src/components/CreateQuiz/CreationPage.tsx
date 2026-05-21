import QuizForm from "./QuizForm";
import type { NewQuiz, User } from "../../types";
import quizService from "../../services/quizService";
import { useAppDispatch } from "../../store/hooks";
import { setNotification } from "../../store/reducers/notificationReducer";
import { addUserQuiz } from "../../store/reducers/userQuizzesReducer";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (newQuiz: NewQuiz, user: User) => {
    try {
      const quiz = await quizService.createQuiz(newQuiz, user);
      if (quiz) {
        dispatch(setNotification(`New quiz ${quiz.name} added!`, 5));
        dispatch(addUserQuiz(quiz));
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) dispatch(setNotification(error.message, 5));
    }
  };
  return (
    <div className="h-max py-4 px-2 bg-white">
      <QuizForm onSubmitQuiz={handleSubmit} />
    </div>
  );
};

export default CreationPage;
