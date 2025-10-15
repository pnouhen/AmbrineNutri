import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ targetRef }) {
  const location = useLocation();

  useEffect(() => {
    if (!targetRef?.current) return;

    const el = targetRef.current;

    // Observe to detect when the height stabilizes
    let lastHeight = el.offsetHeight;

    const observer = new ResizeObserver(() => {
      const newHeight = el.offsetHeight;
      if (newHeight === lastHeight) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        observer.disconnect();
      } else {
        lastHeight = newHeight;
      }
    });

    observer.observe(el);

    // Clean-up if route change before stabilization
    return () => observer.disconnect();
  }, [location.pathname, targetRef]);

  return null;
}
