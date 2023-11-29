import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <div className="bg-white p-11 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      {errors.loginMessage && <p className="text-red-500 text-center mb-4">{errors.loginMessage}</p>}
      <form onSubmit={login}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username:
          </label>
          <input
            type="text"
            name="username"
            required
            className="w-full py-3 px-5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full py-3 px-5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            type="submit"
            // onClick={login}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
