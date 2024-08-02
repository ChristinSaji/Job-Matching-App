import React, { useState } from "react";
import Navbar from "./Navbar";

function Dashboard() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [matchingScore, setMatchingScore] = useState(null);

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="w-full max-w-2xl p-10 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-800">
            Job Match
          </h1>
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
