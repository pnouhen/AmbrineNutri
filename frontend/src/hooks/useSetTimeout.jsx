import React, { useEffect } from "react";

export function useSetTimeout(callback, delay, deps = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(); // on exécute la fonction
    }, delay);

    return () => clearTimeout(timer);
  }, deps);
}