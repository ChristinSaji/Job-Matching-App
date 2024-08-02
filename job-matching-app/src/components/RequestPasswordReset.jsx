import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../userpool";
import Notification from "./Notification";

function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({ Username: email, Pool: UserPool });

    user.forgotPassword({
      onSuccess: () => {
        setNotification({
          message:
            "Password reset code sent successfully! Please check your email.",
          type: "success",
        });
        setTimeout(() => {
          navigate("/confirm-password-reset", { state: { email } });
        }, 3000);
      },
      onFailure: () => {
        setNotification({
          message: "Password reset request failed",
          type: "error",
        });
      },
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-800">
          Request Password Reset
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
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none"
          >
            Request Password Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestPasswordReset;
