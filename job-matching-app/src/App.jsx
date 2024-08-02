import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import RequestPasswordReset from "./components/RequestPasswordReset";
import ConfirmPasswordReset from "./components/ConfirmPasswordReset";
import Dashboard from "./components/Dashboard";
import History from "./components/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/request-password-reset"
          element={<RequestPasswordReset />}
        />
        <Route
          path="/confirm-password-reset"
          element={<ConfirmPasswordReset />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
