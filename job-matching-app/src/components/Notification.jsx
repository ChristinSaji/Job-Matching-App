import React from "react";

function Notification({ message, type, onClose }) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
        type === "success"
          ? "bg-indigo-800 text-white"
          : "bg-red-800 text-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Notification;
