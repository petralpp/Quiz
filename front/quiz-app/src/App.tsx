import { useState, useEffect } from "react";
import type { Quiz, QuizDescription } from "./types";
import quizService from "./services/quizService";

import TopBar from "./components/TopBar";
import QuizList from "./components/QuizList";
import ActiveQuiz from "./components/ActiveQuiz";
import QuizOVerlay from "./components/QuizOverlay";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setEducationList } from "./store/reducers/educationReducer";
import { setEntertainmentList } from "./store/reducers/entertainmentReducer";
import { startQuiz } from "./store/reducers/activeQuizReducer";
import {
  selectEducationQuizzes,
  selectEntertainmentQuizzes
} from "./store/selectors";

function App() {
  const entertainmentList: Quiz[] = useAppSelector(selectEntertainmentQuizzes);
  const educationList: Quiz[] = useAppSelector(selectEducationQuizzes);
  const selectedQuiz: QuizDescription = useAppSelector(
    (state) => state.selectedQuiz
  );
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const toggleOverlay = () => {
    setOverlayIsOpen(!overlayIsOpen);
  };

  useEffect(() => {
    quizService.getAllQuizzes().then((data) => {
      if (data) {
        const entertainment: Quiz[] = [];
        const education: Quiz[] = [];
        data.forEach((quiz) =>
          quiz.category === "Entertainment"
            ? entertainment.push(quiz)
            : education.push(quiz)
        );
        dispatch(setEntertainmentList(entertainment));
        dispatch(setEducationList(education));
      }
    });
  }, [dispatch]);

  const start = () => {
    let quizElement = null;
    if (selectedQuiz.category === "Entertainment") {
      quizElement = entertainmentList.find(
        (quiz) => quiz.name === selectedQuiz.name
      );
    } else {
      quizElement = educationList.find((quiz) => quiz.name === selectedQuiz.name);
    }
    if (quizElement) {
      dispatch(startQuiz(quizElement));
    }
  };

  return (
    <div className="bg-linear-to-r from-indigo-500 to-purple-500 h-screen font-sans text-lg">
      <TopBar />
      <ActiveQuiz />
      <QuizList toggleOverlay={toggleOverlay} />
      <QuizOVerlay isOpen={overlayIsOpen} onClose={toggleOverlay} start={start} />
    </div>
  );
}

export default App;
