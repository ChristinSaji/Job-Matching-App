import React, { useState } from "react";
import Navbar from "./Navbar";
import UserPool from "../userpool";
import Notification from "./Notification";

// Code Source: https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });

function Dashboard() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [matchingScore, setMatchingScore] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = UserPool.getCurrentUser();
    if (!user) {
      setNotification({ message: "User is not authenticated.", type: "error" });
      return;
    }

    user.getSession(async (err, session) => {
      if (err) {
        setNotification({
          message: "Failed to get user session.",
          type: "error",
        });
        return;
      }

      const idToken = session.getIdToken().getJwtToken();

      const resumeBase64 = await toBase64(resume);

      const formData = {
        companyName,
        jobTitle,
        jobDescription,
        resume: {
          filename: resume.name,
          content: resumeBase64,
          contentType: resume.type,
        },
      };

      try {
        const response = await fetch(
          "https://xxeylhpora.execute-api.us-east-1.amazonaws.com/dev/applications",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
              Authorization: idToken,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setMatchingScore(data.matchingScore);
          setNotification({
            message: "Application submitted successfully!",
            type: "success",
          });
        } else {
          setNotification({
            message: data.error || "Failed to submit job application.",
            type: "error",
          });
        }
      } catch (error) {
        setNotification({
          message: "An error occurred while submitting the job application.",
          type: "error",
        });
      }
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="w-full max-w-2xl p-10 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-800">
            Job Match
          </h1>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={closeNotification}
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="companyName"
                className="block font-medium text-indigo-800"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="jobTitle"
                className="block font-medium text-indigo-800"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="jobDescription"
                className="block font-medium text-indigo-800"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-28 px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
                required
              ></textarea>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="resume"
                className="block font-medium text-indigo-800"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                onChange={handleResumeUpload}
                className="w-full px-4 py-2 border rounded-md ring-1 ring-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none"
            >
              Submit
            </button>
          </form>
          {matchingScore !== null && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-center text-indigo-800">
                Matching Score: {matchingScore}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
