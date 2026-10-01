import TransportIcon from "./TransportIcon";
import { scrollToSection } from "../lib/scroll";

export default function Hero() {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-screen" style={{ background: "var(--card)" }}>
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 pt-28 pb-14 lg:pt-24 lg:pb-16">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-500"
            style={{ background: "var(--primary-light)", borderRadius: "99px", color: "var(--primary)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
            Китай → Россия · Казахстан · СНГ
          </div>
          <div
            className="inline-flex items-center px-3 py-1.5 text-xs font-500"
            style={{ border: "1px solid var(--border)", borderRadius: "99px", color: "var(--muted-foreground)" }}
            title="Демо-проект для портфолио: компания, тарифы и сроки вымышлены"
          >
            Portfolio demo · Full-stack project
          </div>
        </div>

        <h1
          className="font-sora font-500 leading-tight mb-5"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.9rem)", color: "var(--foreground)", letterSpacing: "-0.02em", maxWidth: "640px" }}
        >
          Закупка и доставка из Китая — <span style={{ color: "var(--primary)" }}>в одной цепочке</span>
        </h1>

        <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
          Помогаем найти поставщика, проверить товар и довезти его до вашего склада в России, Казахстане и других странах СНГ.
        </p>

        <div className="flex gap-3 flex-wrap">
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("pricing");
            }}
            className="font-500 px-7 py-3.5 text-sm transition-all duration-200"
            style={{ background: "var(--primary)", color: "#FEFEFE", borderRadius: "10px" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.87")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Рассчитать доставку
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
            }}
            className="font-400 px-7 py-3.5 text-sm transition-all duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)", borderRadius: "10px", background: "var(--background)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Как это работает
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 max-w-xl" style={{ borderTop: "1px solid var(--border)" }}>
          {[
            { value: "3", label: "способа доставки: море, ж/д, авиа" },
            { value: "4", label: "этапа — от заявки до доставки" },
            { value: "1", label: "заявка на закупку и доставку" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-sora font-600 text-2xl mb-1" style={{ color: "var(--primary)", letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div className="text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block overflow-hidden" style={{ background: "var(--secondary)" }}>
        <img
          src="/hero-shanghai.jpg"
          alt="Панорама Шанхая — торговый центр Китая"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 40%)" }} />
        <div className="absolute left-8 bottom-24 flex flex-col items-start gap-2.5">
          <span
            className="text-[11px] font-600 px-3 py-1 mb-1"
            style={{ background: "rgba(13,26,46,0.55)", color: "#FEFEFE", borderRadius: "99px", backdropFilter: "blur(8px)", letterSpacing: "0.04em", textTransform: "uppercase" }}
          >
            Направления · ориентировочные сроки
          </span>
          {([
            { from: "Гуанчжоу", to: "Москва", type: "rail", days: "18–25 дней" },
            { from: "Иу", to: "Алматы", type: "rail", days: "12–16 дней" },
            { from: "Шэньчжэнь", to: "Астана", type: "air", days: "5–7 дней" },
          ] as const).map((r, i) => (
            <div
              key={r.from + r.to}
              className="route-pill flex items-center gap-3 pl-2 pr-4 py-2"
              style={{
                marginLeft: i * 18,
                animationDelay: `${0.15 + i * 0.12}s`,
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(14px)",
                borderRadius: "99px",
                boxShadow: "0 10px 30px rgba(13,26,46,0.22)",
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", color: "#FEFEFE" }}
              >
                <TransportIcon type={r.type} size={16} />
              </span>
              <span className="text-sm font-600 whitespace-nowrap" style={{ color: "var(--foreground)" }}>
                {r.from} <span style={{ color: "var(--muted-foreground)" }}>→</span> {r.to}
              </span>
              <span className="w-px h-4" style={{ background: "var(--border)" }} />
              <span className="text-xs font-500 whitespace-nowrap" style={{ color: "var(--primary)" }}>{r.days}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
