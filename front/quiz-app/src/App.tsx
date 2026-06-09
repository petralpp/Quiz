import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import storageService from "./services/storageService";

import { useAppDispatch } from "./store/hooks";
import { fetchQuizzes } from "./store/reducers/quizReducer";
import { fetchUserQuizzes, setUser } from "./store/reducers/userReducer";

import QuizController from "./components/Quiz/QuizController";
import CreationPage from "./components/CreateQuiz/CreationPage";
import Register from "./components/User/Register";
import Notification from "./components/Notification";
import Login from "./components/User/Login";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
    const foundUser = storageService.getUser("quizAppUser");
    if (foundUser) {
      dispatch(setUser(foundUser));
      dispatch(fetchUserQuizzes(foundUser));
    }
  }, [dispatch]);

  return (
    <div className="h-full font-sans text-lg">
      <Router>
        <Notification />
        <Routes>
          <Route path="/" element={<QuizController />} />
          <Route path="/create" element={<CreationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
