import logo from "../assets/logo.png";
import { scrollToHome, scrollToSection } from "../lib/scroll";

export default function Footer() {
  const links = [
    { label: "Услуги", id: "services" },
    { label: "Как это работает", id: "how-it-works" },
    { label: "Цены", id: "pricing" },
    { label: "FAQ", id: "faq" },
    { label: "Контакты", id: "contact" },
  ];

  return (
    <footer className="px-6 md:px-12 pt-12 pb-8" style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <button
              type="button"
              onClick={scrollToHome}
              className="flex items-center gap-2 mb-4"
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
              aria-label="Перейти на главную страницу"
            >
              <img src={logo} alt="ChinaShipments" className="h-7 w-auto" />
              <span className="font-sora font-700 text-lg" style={{ letterSpacing: "-0.005em", color: "var(--foreground)" }}>
                ChinaShipments
              </span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
              Поиск поставщиков, закупка и доставка из Китая в Россию, Казахстан и страны СНГ.
            </p>
          </div>

          <div>
            <div className="text-xs font-600 mb-4" style={{ color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Навигация</div>
            <ul className="flex flex-col gap-1.5">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="footer-link text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.id);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-600 mb-4" style={{ color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Демо проекта</div>
            <ul className="flex flex-col gap-2.5">
              <li><a href="/admin-demo" className="footer-link text-sm">Админ-панель (демо) →</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 pt-6 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span>© {new Date().getFullYear()} ChinaShipments · Portfolio demo</span>
          <span>React · TypeScript · FastAPI · PostgreSQL</span>
        </div>
      </div>
    </footer>
  );
}
