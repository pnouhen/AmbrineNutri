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

    // Select the main container
    const pageContainer = document.getElementById("page-container");
    if (pageContainer) {
      pageContainer.style.height = "0px";
    }
  }, [location.pathname]);

  return children;
}
