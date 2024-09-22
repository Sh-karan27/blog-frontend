import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = ({ setSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        navigate("/");
        window.location.reload();
      }
    });
  };

  return (
    <div className="w-[25rem] h-[35rem] glass-background rounded-lg shadow-lg flex flex-col items-center justify-center ">
      <div className="w-full flex items-center justify-between p-8">
        <h1 className="text-3xl font-bold">BlogExpress</h1>
        <div
          className="text-sm text-gray-400 flex flex-col items-end justify-end cursor-pointer"
          onClick={() => setSignUp(true)}
        >
          <span>No account?</span> <span>Sign-up</span>
        </div>
      </div>
      <div className="px-8 w-full">
        <h1 className="text-5xl font-bold">Sign in</h1>
      </div>
      <div className="w-full p-8">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col text-gray-400">
            Username or Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 p-2 rounded-md text-black focus:border-blue-500 border outline-none"
            />
          </label>
          <label className="flex flex-col text-gray-400">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-1 p-2 border outline-none text-black rounded-md focus:border-blue-500"
            />
          </label>
          <button
            className="border-black px-4 py-2 w-1/4 rounded-md bg-black text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
