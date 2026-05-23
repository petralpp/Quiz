import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";

import type { User } from "../types";
import storageService from "../services/storageService";

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors";
import { useAppDispatch } from "../store/hooks";
import { clearUser } from "../store/reducers/userReducer";
import { clearUserQuizList } from "../store/reducers/userQuizzesReducer";
import { setNotification } from "../store/reducers/notificationReducer";

const NavBar = () => {
  const navigate = useNavigate();
  const user: User | null = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleLogout = () => {
    storageService.removeUser("quizAppUser");
    dispatch(clearUser());
    dispatch(clearUserQuizList());
    dispatch(setNotification("Logged out successfully", 3));
    navigate("/");
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
            <div className="fixed flex flex-col gap-2 p-4 w-[60%] right-0 top-0 bg-indigo-500 rounded text-lg text-center">
              <div className="cursor-pointer text-white">
                <XMarkIcon className="size-7 justify-self-end" />
              </div>
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
        {user && <p className="m-2 text-white font-semibold">Hello {user.name}</p>}
        <Link to="/create">
          <button className="btn btn-blue font-semibold">Create</button>
        </Link>
        {user ? (
          <button onClick={handleLogout} className="btn btn-white font-semibold">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-white font-semibold">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-white font-semibold">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
