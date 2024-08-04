import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import UserPool from "../userpool";
import Notification from "./Notification";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
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

        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/applications`,
            {
              headers: {
                Authorization: idToken,
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            setHistoryData(data.history);
          } else {
            setNotification({
              message: data.error || "Failed to fetch history.",
              type: "error",
            });
          }
        } catch (error) {
          setNotification({
            message: "An error occurred while fetching the history.",
            type: "error",
          });
        }
      });
    };

    fetchHistory();
  }, []);

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-start justify-center min-h-screen bg-gray-950">
        <div className="w-full max-w-4xl p-10 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-800">
            History
          </h1>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={closeNotification}
            />
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-indigo-800">
                  <th className="px-4 py-2">Sno</th>
                  <th className="px-4 py-2">Company Name</th>
                  <th className="px-4 py-2">Job Title</th>
                  <th className="px-4 py-2">Resume</th>
                  <th className="px-4 py-2">Matching Score</th>
                  <th className="px-4 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {historyData
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((entry, index) => (
                    <tr key={entry.applicationId}>
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
                        {entry.resumeFileName}
                      </td>
                      <td className="border border-indigo-800 px-4 py-2">
                        {entry.matchingScore}
                      </td>
                      <td className="border border-indigo-800 px-4 py-2">
                        {new Date(entry.timestamp).toLocaleString()}
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
