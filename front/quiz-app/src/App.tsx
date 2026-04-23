import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import type { Quiz, QuizDescription } from "./types";
import quizService from "./services/quizService";
import storageService from "./services/storageService";

import TopBar from "./components/TopBar";
import CategorySection from "./components/CategorySection";
import ActiveQuiz from "./components/ActiveQuiz";
import QuizOverlay from "./components/QuizOverlay";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setEducationList } from "./store/reducers/educationReducer";
import { setEntertainmentList } from "./store/reducers/entertainmentReducer";
import { startQuiz } from "./store/reducers/activeQuizReducer";
import {
  selectedQuizDescription,
  selectEducationQuizzes,
  selectEntertainmentQuizzes
} from "./store/selectors";
import CreationPage from "./components/CreationPage";
import LoginRegister from "./components/LoginRegister";
import { clearUser, setUser } from "./store/reducers/userReducer";
import Notification from "./components/Notification";
import { setNotification } from "./store/reducers/notificationReducer";
import { setUserQuizList } from "./store/reducers/userQuizzesReducer";

function App() {
  const entertainmentList: Quiz[] = useAppSelector(selectEntertainmentQuizzes);
  const educationList: Quiz[] = useAppSelector(selectEducationQuizzes);
  const selectedQuiz: QuizDescription = useAppSelector(selectedQuizDescription);
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
    const foundUser = storageService.getUser("quizAppUser");
    if (foundUser) {
      dispatch(setUser(foundUser));
      quizService.getUserQuizzes(foundUser).then((data) => {
        if (data) {
          console.log("Käyttäjän quizzit: ", data);
          dispatch(setUserQuizList(data));
        }
      });
    }
  }, [dispatch]);

  const handleLogout = () => {
    storageService.removeUser("quizAppUser");
    dispatch(clearUser());
    dispatch(setNotification("Logged out successfully", 5));
  };

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
    <Router>
      <div className="font-sans text-lg">
        <TopBar handleLogout={handleLogout} />
        <Notification />
        <ActiveQuiz />
        <QuizOverlay isOpen={overlayIsOpen} onClose={toggleOverlay} start={start} />
        <Routes>
          <Route
            path="/"
            element={<CategorySection toggleOverlay={toggleOverlay} />}
          />
          <Route path="/create" element={<CreationPage />} />
          <Route path="/register" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
