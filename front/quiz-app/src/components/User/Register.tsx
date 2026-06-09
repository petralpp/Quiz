import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../store/reducers/userReducer";
import { useAppDispatch } from "../../store/hooks";

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!RegisterIsValid) return;
    const isRegistered = await dispatch(
      registerUser(registerUsername, registerPassword, name)
    );

    if (isRegistered) {
      setRegisterUsername("");
      setRegisterPassword("");
      setConfirmPassword("");
      setName("");
      navigate("/");
    }
  };

  const RegisterIsValid =
    registerUsername.trim().length > 2 &&
    registerPassword.trim().length > 13 &&
    registerPassword === confirmPassword &&
    name.trim().length > 2;

  return (
    <div className="h-max py-4 px-2 bg-white">
      <Link to="/">
        <button className="btn btn-blue mx-4">Back</button>
      </Link>
      <div className="flex justify-evenly flex-wrap gap-1 m-auto py-2 text-center">
        <div className="p-6">
          <form className="space-y-4">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-md">
              Only letters and numbers accepted (leading and trailing spaces will be
              removed)
            </p>
            <div className="text-left">
              <label>
                Username *
                <input
                  type="text"
                  value={registerUsername}
                  minLength={3}
                  maxLength={20}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3-20 characters"
                ></input>
              </label>
            </div>
            <div className="text-left">
              <label>
                Name *
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
            <div className="text-left">
              <label>
                Password *
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
            <div className="text-left">
              <label>
                Confirm password *
                <input
                  type="password"
                  value={confirmPassword}
                  minLength={14}
                  maxLength={25}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="14-25 characters"
                ></input>
              </label>
            </div>
            <button
              type="submit"
              disabled={!RegisterIsValid}
              onClick={handleRegister}
              className={RegisterIsValid ? "btn btn-blue" : "btn-blue-disabled"}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
