import React from "react";
import { AiOutlineInfoCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";

const icons = {
  success: <AiOutlineCheckCircle className="w-5 h-5 mr-2" />,
  error: <AiOutlineCloseCircle className="w-5 h-5 mr-2" />,
};

const themeMap = {
  success: "bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400",
  error: "bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400",
};

export default function Alert({ type = "info", message, onClose }) {
  return (
    <div className={`flex items-center p-2 rounded ${themeMap[type]}`} role="alert">
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button className="ml-auto" onClick={onClose}>✖</button>
    </div>
  );
}
