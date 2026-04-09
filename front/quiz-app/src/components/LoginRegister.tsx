import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../store/reducers/userReducer";
import { useAppDispatch } from "../store/hooks";

const LoginRegister = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!LoginIsValid) return;
    const loggedIn = await dispatch(loginUser(loginUsername, loginPassword));

    if (loggedIn) {
      setLoginUsername("");
      setLoginPassword("");
      navigate("/");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!RegisterIsValid) return;
    const isRegistered = await dispatch(
      registerUser(registerUsername, registerPassword, name)
    );

    if (isRegistered) {
      setRegisterUsername("");
      setRegisterPassword("");
      setName("");
      navigate("/");
    }
  };

  const LoginIsValid =
    loginUsername.trim().length > 3 && loginPassword.trim().length > 13;

  const RegisterIsValid =
    registerUsername.trim().length > 3 &&
    registerPassword.trim().length > 13 &&
    name.trim().length > 2;

  return (
    <div>
      <Link to="/">
        <button className="btn-white mx-4">Back</button>
      </Link>
      <div className="flex justify-evenly flex-wrap gap-1 m-auto py-2">
        <div className="bg-white rounded-2xl p-6">
          <form className="space-y-4">
            <h2 className="text-xl font-semibold">Login</h2>
            <div>
              <label>
                Username
                <input
                  type="text"
                  value={loginUsername}
                  minLength={4}
                  maxLength={15}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="4-15 characters"
                ></input>
              </label>
            </div>
            <div>
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
              className={LoginIsValid ? "btn-blue" : "btn-blue-disabled"}
            >
              Login
            </button>
          </form>
        </div>
        <div className="bg-white rounded-2xl p-6">
          <form className="space-y-4">
            <h2 className="text-xl font-semibold">Register</h2>
            <p className="text-md">Accepted characters: a-zA-ZÅåÄäÖö</p>
            <div>
              <label>
                Username
                <input
                  type="text"
                  value={registerUsername}
                  minLength={4}
                  maxLength={15}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="4-15 characters"
                ></input>
              </label>
            </div>
            <div>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3-20 characters"
                ></input>
              </label>
            </div>
            <div>
              <label>
                Password
                <input
                  type="password"
                  value={registerPassword}
                  minLength={14}
                  maxLength={25}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="14-25 characters"
                ></input>
                <p className="text-sm">
                  Must contain at least one number, one uppercase and one lowercase
                  character
                </p>
              </label>
            </div>
            <button
              type="submit"
              disabled={!RegisterIsValid}
              onClick={handleRegister}
              className={RegisterIsValid ? "btn-blue" : "btn-blue-disabled"}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
