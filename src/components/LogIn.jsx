import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Contact from "../assets/ContactUs.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 mt-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
        <img
          src={Contact}
          alt="Contact"
          className="w-full lg:w-1/3 h-64 lg:h-auto object-cover"
        />
        <div className="w-full lg:w-2/3 p-8">
          <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
            {error && <p>{error}</p>}

            <label className="flex flex-col">
              Enter email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="mt-1 p-2 border rounded-md"
              />
            </label>

            <label className="flex flex-col">
              Enter password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mt-1 p-2 border rounded-md"
              />
            </label>
          </form>
          <button className="border" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
