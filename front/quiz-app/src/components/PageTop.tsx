import { Link } from "react-router-dom";

import type { User } from "../types";
import storageService from "../services/storageService";

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors";
import { useAppDispatch } from "../store/hooks";
import { clearUser } from "../store/reducers/userReducer";
import { clearUserQuizList } from "../store/reducers/userQuizzesReducer";
import { setNotification } from "../store/reducers/notificationReducer";

const PageTop = () => {
  const user: User | null = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    storageService.removeUser("quizAppUser");
    dispatch(clearUser());
    dispatch(clearUserQuizList());
    dispatch(setNotification("Logged out successfully", 5));
  };

  return (
    <div className="flex justify-between items-center px-4">
      <h1 className="text-center text-4xl p-5 mb-2 font-bold text-white leading-tight">
        Quiz!
      </h1>
      <div className="flex gap-2">
        {user && <p>Hello {user.name}</p>}
        <Link to="/create">
          <button className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded">
            Create
          </button>
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-amber-600 hover:bg-indigo-600 text-white rounded">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PageTop;
