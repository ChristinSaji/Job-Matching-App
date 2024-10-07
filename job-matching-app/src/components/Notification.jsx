import React from "react";

function Notification({ message, type, onClose }) {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg ${
        type === "success" ? "bg-primary text-white" : "bg-accent text-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white text-xl font-black hover:text-gray-400"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Notification;
