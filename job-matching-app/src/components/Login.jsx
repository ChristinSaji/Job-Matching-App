import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../userpool";
import Notification from "./Notification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: () => {
        setNotification({
          message: "Logged in successfully!",
          type: "success",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      },
      onFailure: () => {
        setNotification({ message: "Error logging in", type: "error" });
      },
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-dark">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-secondary shadow-lg">
        <h1 className="text-3xl font-bold text-center text-primary">Login</h1>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block font-medium text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md ring-1 ring-primary focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block font-medium text-primary"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md ring-1 ring-primary focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-secondary font-semibold bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/request-password-reset" className="text-primary">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
