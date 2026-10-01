import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { scrollToHome, scrollToSection } from "../lib/scroll";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = ["services", "how-it-works", "pricing", "faq", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const links = ["Услуги", "Как это работает", "Цены", "FAQ", "Контакты"];
  const SECTION_IDS: Record<string, string> = {
    "Услуги": "services",
    "Как это работает": "how-it-works",
    "Цены": "pricing",
    "FAQ": "faq",
    "Контакты": "contact",
  };
  const hrefFor = (item: string) => `#${SECTION_IDS[item]}`;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(248,250,255,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 6px 24px rgba(13,26,46,0.06)" : "none",
        transition: "box-shadow .2s ease",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <button
          type="button"
          onClick={scrollToHome}
          aria-label="Перейти на главную страницу"
          className="flex items-center gap-2"
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
        >
          <img src={logo} alt="ChinaShipments" className="h-8 w-auto" />
          <span className="font-sora font-700 text-lg" style={{ letterSpacing: "-0.005em", color: "var(--foreground)" }}>
            ChinaShipments
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((item) => {
            const isActive = active === SECTION_IDS[item];
            return (
              <a
                key={item}
                href={hrefFor(item)}
                className="nav-link text-sm transition-colors duration-200"
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(hrefFor(item).slice(1));
                }}
              >
                {item}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="hidden md:inline-block text-sm font-500 px-5 py-2.5 transition-all duration-200"
          style={{ background: "var(--primary)", color: "#FEFEFE", borderRadius: "9px" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Обсудить задачу
        </a>

        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-9 h-9"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className="block w-5 h-[1.5px] transition-transform duration-200"
            style={{ background: "var(--foreground)", transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-5 h-[1.5px] transition-transform duration-200"
            style={{ background: "var(--foreground)", transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-5" style={{ borderTop: "1px solid var(--border)" }}>
          {links.map((item) => (
            <a
              key={item}
              href={hrefFor(item)}
              className="text-sm py-3"
              style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToSection(hrefFor(item).slice(1));
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-500 px-5 py-3 mt-4 text-center"
            style={{ background: "var(--primary)", color: "#FEFEFE", borderRadius: "9px" }}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToSection("contact");
            }}
          >
            Обсудить задачу
          </a>
        </div>
      )}
    </nav>
  );
}
