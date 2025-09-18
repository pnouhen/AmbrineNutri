import React, { useEffect } from "react";

export default function useScrollAuto() {
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "auto";
    }
    console.log("ok")
  }, []);
}