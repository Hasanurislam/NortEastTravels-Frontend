// client/src/hooks/useScrollDirection.js
import { useEffect, useRef, useState } from "react";

export default function useScrollDirection({ threshold = 6 } = {}) {
  const [direction, setDirection] = useState("up"); // "up" | "down"
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const diff = y - lastYRef.current;

      if (Math.abs(diff) > threshold) {
        setDirection(diff > 0 ? "down" : "up");
        lastYRef.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
