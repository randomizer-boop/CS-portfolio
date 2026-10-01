import { STEPS } from "../data/steps";

export default function HowItWorks() {
  const chain = ["Китай", "Поставщик", "Закупка", "Контроль", "Логистика", "СНГ"];

  return (
    <section id="how-it-works" className="py-11 md:py-16 px-6 md:px-12" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-sm font-500 mb-3" style={{ color: "var(--primary)" }}>Как это работает</div>
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-16 items-start mb-12">
          <h2 className="font-sora font-600 leading-tight" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
            Вы ставите задачу —<br />мы собираем цепочку вокруг неё
          </h2>
          <p className="text-base leading-relaxed lg:max-w-md lg:justify-self-end lg:pt-1" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
            Не нужно отдельно искать поставщика, договариваться о закупке и разбираться с логистикой — мы соединяем эти этапы в один процесс.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <li key={step.number} className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div
                    className="font-sora font-600 text-sm flex items-center justify-center shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: isLast ? "var(--primary)" : "var(--primary-light)",
                      color: isLast ? "#FEFEFE" : "var(--primary)",
                      border: isLast ? "none" : "1px solid #C9DAF3",
                    }}
                  >
                    {step.number}
                  </div>
                  {!isLast && (
                    <div className="hidden lg:block flex-1 ml-3" style={{ height: 0, borderTop: "2px dashed #C9DAF3" }} />
                  )}
                </div>
                <div
                  className="flex-1 p-5 md:p-6 transition-all duration-200"
                  style={{
                    background: isLast ? "var(--primary)" : "var(--background)",
                    border: isLast ? "1px solid var(--primary)" : "1px solid var(--border)",
                    borderRadius: "16px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(3,69,155,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 className="font-sora font-600 text-base mb-2 leading-snug" style={{ color: isLast ? "#FEFEFE" : "var(--foreground)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: isLast ? "rgba(255,255,255,0.75)" : "var(--secondary-foreground)", fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 md:mt-12 flex justify-center">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 py-3 text-sm rounded-2xl sm:rounded-full"
            style={{ background: "var(--primary-light)", border: "1px solid #C9DAF3" }}
          >
            <span className="text-xs font-500 mr-1 hidden sm:inline" style={{ color: "var(--muted-foreground)" }}>Вся цепочка:</span>
            {chain.map((item, index) => (
              <span key={item} className="flex items-center gap-2">
                <span className="font-500" style={{ color: index === 0 || index === chain.length - 1 ? "var(--primary)" : "var(--foreground)" }}>{item}</span>
                {index < chain.length - 1 && <span style={{ color: "#9DB7DD" }}>→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
