import { Link } from "react-router-dom";
import AddQuizForm from "./AddQuizForm";
import type { NewQuiz, User } from "../types";
import quizService from "../services/quizService";
import { useAppDispatch } from "../store/hooks";
import { setNotification } from "../store/reducers/notificationReducer";

const CreationPage = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (newQuiz: NewQuiz, user: User) => {
    try {
      const quiz = await quizService.createQuiz(newQuiz, user);
      if (quiz) {
        dispatch(setNotification(`New quiz ${quiz.name} added!`, 5));
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) dispatch(setNotification(error.message, 5));
    }
  };
  return (
    <div className="h-max py-4 px-2 bg-white">
      <Link to="/">
        <button className="btn-blue lg:float-left">Back</button>
      </Link>
      <AddQuizForm onSubmitQuiz={handleSubmit} />
    </div>
  );
};

export default CreationPage;
