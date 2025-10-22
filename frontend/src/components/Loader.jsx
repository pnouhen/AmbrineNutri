import React, { useEffect } from "react";

export default function Loader({ condition }) {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    // Apply or remove h-screen depending on the loader
    if (!condition) {
      root.classList.add("h-screen");
      root.classList.remove("min-h-[100vh]");
    } else {
      root.classList.remove("h-screen");
      root.classList.add("min-h-[100vh]");
    }
  }, [condition]);

  // Show the loader only if condition is false
  if (!condition) {
    return (
      <div className="h-full flex py-5 justify-center bg-white bg-opacity-50">
        <div className="w-8 h-8 border-4 rounded-full border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-gray-300 animate-spin"></div>
      </div>
    );
  } else {
    return null;
  }
}
