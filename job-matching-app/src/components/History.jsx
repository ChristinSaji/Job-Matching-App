import React from "react";
import Navbar from "./Navbar";

function History() {
  const historyData = [];

  return (
    <div>
      <Navbar />
      <div className="flex items-start justify-center min-h-screen bg-gray-950">
        <div className="w-full max-w-4xl p-10 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-800">
            History
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-indigo-800">
                  <th className="px-4 py-2">Sno</th>
                  <th className="px-4 py-2">Company Name</th>
                  <th className="px-4 py-2">Job Title</th>
                  <th className="px-4 py-2">Resume</th>
                  <th className="px-4 py-2">Matching Score</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td className="border border-indigo-800 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-indigo-800 px-4 py-2">
                      {entry.companyName}
                    </td>
                    <td className="border border-indigo-800 px-4 py-2">
                      {entry.jobTitle}
                    </td>
                    <td className="border border-indigo-800 px-4 py-2">
                      {entry.resume}
                    </td>
                    <td className="border border-indigo-800 px-4 py-2">
                      {entry.matchingScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
