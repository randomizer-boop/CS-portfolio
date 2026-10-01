import { useEffect, useState } from "react";
import { scrollToHome } from "../lib/scroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToHome}
      aria-label="Наверх"
      className="fixed right-5 bottom-5 z-40 flex items-center justify-center transition-all duration-200"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--primary)",
        color: "#FEFEFE",
        boxShadow: "0 8px 24px rgba(3,69,155,0.3)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(10px)",
        pointerEvents: visible ? "auto" : "none",
        cursor: "pointer",
      }}
    >
      ↑
    </button>
  );
}
