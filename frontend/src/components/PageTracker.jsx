import React from "react";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTracker({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Save actuel page except AuthPage
    if (!location.pathname.includes("/se-connecter")) {
      sessionStorage.setItem("previousPage", location.pathname);
    }
  }, [location.pathname]);

  return children;
}
