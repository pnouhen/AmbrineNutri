import React from "react";

export default function Button({ text, className, onClick }) {
  return (
    <button
      className={`p-2.5 input font18-600 inputButton cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}