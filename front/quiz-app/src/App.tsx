import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import type { Quiz } from "./types";
import quizService from "./services/quizService";
import storageService from "./services/storageService";

import { useAppDispatch } from "./store/hooks";
import { setEducationList } from "./store/reducers/educationReducer";
import { setEntertainmentList } from "./store/reducers/entertainmentReducer";
import { clearUser, setUser } from "./store/reducers/userReducer";
import { setNotification } from "./store/reducers/notificationReducer";
import { setUserQuizList } from "./store/reducers/userQuizzesReducer";

import PageTop from "./components/PageTop";
import QuizController from "./components/Quiz/QuizController";
import CreationPage from "./components/CreateQuiz/CreationPage";
import Register from "./components/User/Register";
import Notification from "./components/Notification";
import Login from "./components/User/Login";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    quizService
      .getAllQuizzes()
      .then((data) => {
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
      })
      .catch((error) => {
        console.log(error);
        dispatch(setNotification(error.message, 6));
      });
    const foundUser = storageService.getUser("quizAppUser");
    if (foundUser) {
      dispatch(setUser(foundUser));
      quizService
        .getUserQuizzes(foundUser)
        .then((data) => {
          if (data) {
            dispatch(setUserQuizList(data));
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            dispatch(setNotification("Session expired", 6));
            dispatch(clearUser());
            storageService.removeUser("quizAppUser");
          } else {
            dispatch(
              setNotification("Something went wrong when fetching user quizzes", 6)
            );
          }
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="font-sans text-lg">
        <PageTop />
        <Notification />
        <Routes>
          <Route path="/" element={<QuizController />} />
          <Route path="/create" element={<CreationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
