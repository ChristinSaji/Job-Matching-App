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
        setNotification({
          message: "User is not authenticated.",
          type: "error",
        });
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

  const getScoreIcon = (currentScore, previousScore) => {
    if (currentScore > previousScore) {
      return <span className="text-green-500">▲</span>;
    } else if (currentScore < previousScore) {
      return <span className="text-red-500">▼</span>;
    } else {
      return <span className="text-gray-500">=</span>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full p-10 space-y-3 bg-white">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          History
        </h1>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-accent">
            <thead className="text-xs uppercase bg-accent text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sno
                </th>
                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Resume
                </th>
                <th scope="col" className="px-6 py-3">
                  Matching Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {historyData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center font-medium text-primary"
                  >
                    No history available
                  </td>
                </tr>
              ) : (
                historyData
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((entry, index, array) => {
                    let previousScore = null;

                    // Check if there was a previous entry for the same company and job title
                    for (let i = index + 1; i < array.length; i++) {
                      const prevEntry = array[i];
                      if (
                        prevEntry.companyName === entry.companyName &&
                        prevEntry.jobTitle === entry.jobTitle
                      ) {
                        previousScore = prevEntry.matchingScore;
                        break;
                      }
                    }

                    return (
                      <tr
                        key={entry.applicationId}
                        className="bg-white border-b hover:bg-secondary"
                      >
                        <td className="px-6 py-4 font-medium text-primary whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-primary">
                          {entry.companyName}
                        </td>
                        <td className="px-6 py-4 text-primary">
                          {entry.jobTitle}
                        </td>
                        <td className="px-6 py-4 text-primary">
                          {entry.resumeFileName}
                        </td>
                        <td className="px-6 py-4 text-primary flex items-center">
                          {entry.matchingScore}
                          {previousScore !== null && (
                            <span className="ml-2">
                              {getScoreIcon(entry.matchingScore, previousScore)}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-primary">
                          {new Date(entry.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
