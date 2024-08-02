import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPool from "../userpool";
import Notification from "./Notification";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UserPool.signUp(email, password, [], null, (err) => {
      if (err) {
        setNotification({ message: "Error signing up", type: "error" });
      } else {
        setNotification({
          message:
            "Signed up successfully! Please check your email for verification code.",
          type: "success",
        });
        setTimeout(() => {
          navigate("/verify-email", { state: { email } });
        }, 3000);
      }
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-800">
          Signup
        </h1>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block font-medium text-indigo-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block font-medium text-indigo-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none"
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
