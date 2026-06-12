import { useState } from "react";

import type { Quiz, QuizDescription, User } from "../../types";
import useIsDesktop from "../../hooks";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { startQuiz } from "../../store/reducers/activeQuizReducer";
import { deleteUserQuiz } from "../../store/reducers/userReducer";
import {
  selectEducationQuizzes,
  selectEntertainmentQuizzes,
  selectGeneralQuizzes,
  selectUser,
  selectUserQuizzes
} from "../../store/selectors";

import QuizList from "./QuizList";
import QuizOverlay from "./QuizOverlay";
import ActiveQuizController from "./ActiveQuiz/ActiveQuizController";
import CategoryNavDesktop from "./CategoryNavDesktop";
import CategoryNavMobile from "./CategoryNavMobile";
import NavBarDesktop from "../NavBarDesktop";
import NavBarMobile from "../NavBarMobile";

const QuizController = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.activeQuiz.isActive);
  const isDesktop = useIsDesktop();
  const entertainmentList: Quiz[] = useAppSelector(selectEntertainmentQuizzes);
  const educationList: Quiz[] = useAppSelector(selectEducationQuizzes);
  const generalList: Quiz[] = useAppSelector(selectGeneralQuizzes);
  const userList: Quiz[] = useAppSelector(selectUserQuizzes);
  const user: User | null = useAppSelector(selectUser);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDescription>({
    _id: "",
    category: "",
    subcategory: "",
    name: "",
    description: "",
    questions: 0
  });
  const [category, setCategory] = useState<string>("Education");
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);

  const findQuiz = (category: string, name: string) => {
    let quiz = null;
    switch (category) {
      case "Education":
        quiz = educationList?.find((q) => q.name === name);
        break;
      case "Entertainment":
        quiz = entertainmentList?.find((q) => q.name === name);
        break;
      case "General":
        quiz = generalList?.find((q) => q.name === name);
        break;
      default:
        quiz = userList?.find((q) => q.name === name);
        break;
    }
    return quiz;
  };

  const start = () => {
    const quiz = findQuiz(selectedQuiz.category, selectedQuiz.name);
    if (quiz) {
      dispatch(startQuiz(quiz));
      setOverlayIsOpen(false);
    }
  };

  const handleClick = (name: string, category: string) => {
    const quiz = findQuiz(category, name);
    if (quiz) {
      setSelectedQuiz({
        ...quiz,
        questions: quiz.questions.length
      });
      setOverlayIsOpen(true);
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
  ) : isDesktop ? (
    <div className="flex flex-row h-fit">
      <CategoryNavDesktop category={category} setCategory={setCategory} />
      <div className="w-full">
        <NavBarDesktop />
        <QuizList category={category} handleClick={handleClick} />
      </div>
      <QuizOverlay
        isOpen={overlayIsOpen}
        toggleOpen={setOverlayIsOpen}
        start={start}
        category={category}
        quiz={selectedQuiz}
        deleteQuiz={handleDelete}
      />
    </div>
  ) : (
    <div>
      <NavBarMobile />
      <CategoryNavMobile category={category} setCategory={setCategory} />
      <QuizList category={category} handleClick={handleClick} />
      <QuizOverlay
        isOpen={overlayIsOpen}
        toggleOpen={setOverlayIsOpen}
        start={start}
        category={category}
        quiz={selectedQuiz}
        deleteQuiz={handleDelete}
      />
    </div>
  );
};

export default QuizController;
