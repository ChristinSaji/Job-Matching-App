import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import UserPool from "../userpool";
import Notification from "./Notification";

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
  const [unmatchedWords, setUnmatchedWords] = useState([]);
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResume(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = UserPool.getCurrentUser();
    if (!user) {
      setNotification({ message: "User is not authenticated.", type: "error" });
      setLoading(false);
      return;
    }

    user.getSession(async (err, session) => {
      if (err) {
        setNotification({
          message: "Failed to get user session.",
          type: "error",
        });
        setLoading(false);
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
          `${import.meta.env.VITE_API_URL}/applications`,
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
          setUnmatchedWords(data.unmatchedWords);
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
      setLoading(false);
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full space-y-3 bg-white">
        <h1 className="pt-10 text-4xl font-bold text-center text-primary">
          Job Match
        </h1>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}

        <form onSubmit={handleSubmit} className="px-10 py-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="block font-bold text-xl text-accent"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google Inc."
                  className="w-full px-4 py-2 border rounded-md ring-1 ring-accent focus:outline-none focus:ring focus:ring-accent-dark"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="jobTitle"
                  className="block font-bold text-xl text-accent"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-4 py-2 border rounded-md ring-1 ring-accent focus:outline-none focus:ring focus:ring-accent-dark"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="jobDescription"
                  className="block font-bold text-xl text-accent"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="e.g., Develop and maintain scalable web applications..."
                  className="w-full h-96 px-4 py-2 border rounded-md ring-1 ring-accent focus:outline-none focus:ring focus:ring-accent-dark resize-none overflow-y-auto"
                  required
                ></textarea>
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-center"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <h3 className="font-bold text-xl text-accent mb-2">
                Upload Resume
              </h3>
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                  dragActive
                    ? "border-primary bg-secondary"
                    : "border-accent border-dashed bg-secondary hover:bg-secondary-dark"
                } rounded-lg cursor-pointer`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-accent"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-accent">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-accent">PDF, DOC, DOCX</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleResumeUpload}
                  required
                />
              </label>
              {resume && (
                <p className="mt-3 text-base text-primary">
                  Uploaded File:{" "}
                  <span className="font-semibold">{resume.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {loading ? (
              <button
                type="button"
                className="py-4 px-8 text-white font-semibold text-lg bg-primary rounded-md cursor-not-allowed flex items-center"
                disabled
              >
                <svg
                  className="w-6 h-6 mr-3 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="py-4 px-8 text-white font-semibold text-lg bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
              >
                Calculate Score
              </button>
            )}
          </div>
        </form>

        {matchingScore !== null && (
          <div className="mt-4">
            <h2 className="my-5 text-2xl font-bold text-center text-primary">
              Matching Score: {matchingScore}
            </h2>

            <div className="mt-4 py-6 bg-secondary">
              <div className="flex items-center px-10">
                <h3 className="text-2xl font-bold text-primary whitespace-nowrap">
                  Suggested Words to Improve Score
                </h3>
                <div className="flex-grow ml-10">
                  <span className="block h-1 bg-primary"></span>
                </div>
              </div>
              <div className="flex flex-wrap justify-start px-10 mt-5">
                {unmatchedWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-white rounded-full m-1 text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
