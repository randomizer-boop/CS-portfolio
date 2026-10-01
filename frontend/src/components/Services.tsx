import { SERVICES } from "../data/services";

export default function Services() {
  return (
    <section id="services" className="py-11 md:py-16 px-6 md:px-12" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-sm font-500 mb-3" style={{ color: "var(--primary)" }}>Услуги</div>
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-start mb-10">
          <h2 className="font-sora font-600 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
            От поставщика до двери — без разрыва цепочки
          </h2>
          <p className="text-base leading-relaxed lg:max-w-md lg:justify-self-end lg:pt-1" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
            Берём на себя отдельный этап или всю цепочку целиком — в зависимости от задачи.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="card-hover p-6 flex flex-col gap-2"
              style={{ background: "var(--card)", borderRadius: "16px", border: "1px solid var(--border)" }}
            >
              <div
                className="flex items-center justify-center text-xl mb-2"
                style={{ width: 44, height: 44, borderRadius: "12px", background: "var(--primary-light)" }}
                aria-hidden
              >
                {service.icon}
              </div>
              <div className="font-sora font-600 text-base" style={{ color: "var(--foreground)", letterSpacing: "-0.005em" }}>
                {service.title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
