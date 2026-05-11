import { useState } from "react";

import type { Quiz, QuizDescription } from "../../types";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSelectedQuiz } from "../../store/reducers/selectedQuizReducer";
import { startQuiz } from "../../store/reducers/activeQuizReducer";
import {
  selectedQuizDescription,
  selectEducationQuizzes,
  selectEntertainmentQuizzes,
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
  const selectedQuiz: QuizDescription = useAppSelector(selectedQuizDescription);
  const [category, setCategory] = useState<string>("Education");
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);

  const toggleOverlay = () => {
    setOverlayIsOpen(!overlayIsOpen);
  };

  const start = () => {
    let quizElement = null;
    if (selectedQuiz.category === "Entertainment") {
      quizElement = entertainmentList.find(
        (quiz) => quiz.name === selectedQuiz.name
      );
    } else if (selectedQuiz.category === "Education") {
      quizElement = educationList.find((quiz) => quiz.name === selectedQuiz.name);
    } else {
      quizElement = userList.find((quiz) => quiz.name === selectedQuiz.name);
    }
    if (quizElement) {
      dispatch(startQuiz(quizElement));
    }
  };

  const handleClick = (name: string, category: string) => {
    let quiz = null;
    if (category === "Entertainment") {
      quiz = entertainmentList?.find((q) => q.name === name);
    } else if (category === "Education") {
      quiz = educationList?.find((q) => q.name === name);
    } else {
      quiz = userList?.find((q) => q.name === name);
    }
    if (quiz) {
      dispatch(
        setSelectedQuiz({
          ...quiz,
          questions: quiz.questions.length
        })
      );
      toggleOverlay();
    }
  };

  return isActive ? (
    <ActiveQuizController />
  ) : (
    <>
      <CategoryNavigation category={category} setCategory={setCategory} />
      <QuizList category={category} handleClick={handleClick} />
      <QuizOverlay isOpen={overlayIsOpen} onClose={toggleOverlay} start={start} />
    </>
  );
};

export default QuizController;
