import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars4Icon } from "@heroicons/react/24/outline";

import type { User } from "../types";
import storageService from "../services/storageService";

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors";
import { useAppDispatch } from "../store/hooks";
import { clearUser } from "../store/reducers/userReducer";
import { clearUserQuizList } from "../store/reducers/userQuizzesReducer";
import { setNotification } from "../store/reducers/notificationReducer";

const NavBar = () => {
  const user: User | null = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

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

      <div className="md:hidden">
        <div onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <Bars4Icon className="size-8 cursor-pointer hover:text-white" />
        </div>
        {showMobileMenu && (
          <div
            className="md:hidden overlay-background"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="fixed right-5 top-9 bg-indigo-600 rounded flex flex-col">
              <Link to="/create">
                <div className="px-4 py-2 hover:bg-amber-600 text-white rounded">
                  Create
                </div>
              </Link>
              {user ? (
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-amber-600 text-white rounded"
                >
                  Logout
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <div className="px-4 py-2 hover:bg-amber-600 text-white rounded">
                      Login
                    </div>
                  </Link>
                  <Link to="/register">
                    <div className="px-4 py-2 hover:bg-amber-600 text-white rounded">
                      Register
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex gap-2">
        {user && <p className="font-semibold">Hello {user.name}</p>}
        <Link to="/create">
          <button className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-amber-600 text-white font-semibold rounded">
            Create
          </button>
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer px-4 py-2 bg-white hover:bg-amber-600 text-indigo-500 hover:text-white font-semibold rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="cursor-pointer px-4 py-2 bg-white hover:bg-amber-600 text-indigo-500 hover:text-white font-semibold rounded">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="cursor-pointer px-4 py-2 bg-white hover:bg-amber-600 text-indigo-500 hover:text-white font-semibold rounded">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
