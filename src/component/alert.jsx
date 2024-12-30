import React from "react";

const Alert = ({ message, type = "error", isVisible, onClose }) => {
  if (!isVisible) return null;

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between`}
      >
        <span className="mr-4">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Alert;
