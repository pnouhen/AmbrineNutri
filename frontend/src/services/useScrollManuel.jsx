import React, { useEffect } from "react";

export default function useScrollManuel() {
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);
}