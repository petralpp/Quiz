import { useState } from "react";

import type { Quiz, QuizDescription, User } from "../../types";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { startQuiz } from "../../store/reducers/activeQuizReducer";
import { deleteUserQuiz } from "../../store/reducers/userReducer";
import {
  selectEducationQuizzes,
  selectEntertainmentQuizzes,
  selectUser,
  selectUserQuizzes
} from "../../store/selectors";

import QuizList from "./QuizList";
import CategoryNavigation from "./CategoryNavigation";
import QuizOverlay from "./QuizOverlay";
import ActiveQuizController from "./ActiveQuiz/ActiveQuizController";

const QuizController = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.activeQuiz.isActive);
  const entertainmentList: Quiz[] = useAppSelector(selectEntertainmentQuizzes);
  const educationList: Quiz[] = useAppSelector(selectEducationQuizzes);
  const userList: Quiz[] = useAppSelector(selectUserQuizzes);
  const user: User | null = useAppSelector(selectUser);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDescription>({
    category: "",
    subcategory: "",
    name: "",
    description: "",
    questions: 0
  });
  const [category, setCategory] = useState<string>("Education");
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);

  const toggleOverlay = () => {
    setOverlayIsOpen(!overlayIsOpen);
  };

  const findQuiz = (category: string, name: string) => {
    let quiz = null;
    if (category === "Entertainment") {
      quiz = entertainmentList?.find((q) => q.name === name);
    } else if (category === "Education") {
      quiz = educationList?.find((q) => q.name === name);
    } else {
      quiz = userList?.find((q) => q.name === name);
    }
    return quiz;
  };

  const start = () => {
    const quiz = findQuiz(selectedQuiz.category, selectedQuiz.name);
    if (quiz) {
      dispatch(startQuiz(quiz));
    }
  };

  const handleClick = (name: string, category: string) => {
    const quiz = findQuiz(category, name);
    if (quiz) {
      setSelectedQuiz({
        ...quiz,
        questions: quiz.questions.length
      });
      toggleOverlay();
    }
  };

  const handleDelete = (name: string) => {
    if (!window.confirm("Do you really want to delete this quiz?")) {
      return;
    }
    const quiz = findQuiz(category, name);
    if (quiz && user) {
      dispatch(deleteUserQuiz(quiz._id, user));
    }
  };

  return isActive ? (
    <ActiveQuizController />
  ) : (
    <div className="flex flex-col md:flex-row h-full">
      <CategoryNavigation category={category} setCategory={setCategory} />
      <QuizList category={category} handleClick={handleClick} />
      <QuizOverlay
        isOpen={overlayIsOpen}
        onClose={toggleOverlay}
        start={start}
        category={category}
        quiz={selectedQuiz}
        deleteQuiz={handleDelete}
      />
    </div>
  );
};

export default QuizController;
