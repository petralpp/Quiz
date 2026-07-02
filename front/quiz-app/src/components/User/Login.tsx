import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../store/reducers/userReducer";
import { useAppDispatch } from "../../store/hooks";
import { fetchUserQuizzes } from "../../store/reducers/userReducer";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!LoginIsValid) return;
    const loggedInUser = await dispatch(loginUser(loginUsername, loginPassword));

    if (loggedInUser) {
      setLoginUsername("");
      setLoginPassword("");
      dispatch(fetchUserQuizzes());
      navigate("/");
    }
  };

  const LoginIsValid =
    loginUsername.trim().length > 2 && loginPassword.trim().length > 13;

  return (
    <div className="h-max py-4 px-2 bg-white">
      <Link to="/">
        <button className="btn btn-blue mx-4">Back</button>
      </Link>
      <div className="flex justify-evenly flex-wrap gap-1 m-auto py-2 text-center">
        <div className="p-6">
          <form className="space-y-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <div className="text-left">
              <label>
                Username
                <input
                  type="text"
                  value={loginUsername}
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3-20 characters"
                ></input>
              </label>
            </div>
            <div className="text-left">
              <label>
                Password
                <input
                  type="password"
                  value={loginPassword}
                  minLength={14}
                  maxLength={25}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="14-25 characters"
                ></input>
              </label>
            </div>
            <button
              type="submit"
              disabled={!LoginIsValid}
              onClick={handleLogin}
              className={LoginIsValid ? "btn btn-blue" : "btn-blue-disabled"}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
