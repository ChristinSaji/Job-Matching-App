import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../userpool";
import Notification from "./Notification";

function VerifyEmail() {
  const [code, setCode] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({ Username: email, Pool: UserPool });

    user.confirmRegistration(code, true, (err) => {
      if (err) {
        setNotification({ message: "Verification failed", type: "error" });
      } else {
        setNotification({
          message: "Verification successful",
          type: "success",
        });
        setTimeout(() => {
          navigate("/login");
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
          Verify Email
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
            <label htmlFor="code" className="block font-medium text-indigo-800">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
