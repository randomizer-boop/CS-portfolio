import { useState } from "react";
import { FAQS } from "../data/faq";
import { scrollToSection } from "../lib/scroll";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-11 md:py-16 px-6 md:px-12" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-sm font-500 mb-3" style={{ color: "var(--primary)" }}>FAQ</div>
          <h2 className="font-sora font-600 leading-tight mb-4" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
            Частые вопросы
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
            Коротко о том, как устроена работа — от заявки до доставки.
          </p>
          <div className="p-5" style={{ background: "var(--primary-light)", border: "1px solid #C9DAF3", borderRadius: "16px" }}>
            <div className="font-sora font-600 text-base mb-1.5" style={{ color: "var(--foreground)" }}>Не нашли ответ?</div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
              Опишите задачу в форме заявки — её можно отправить прямо с сайта.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-block text-sm font-600 px-5 py-2.5 transition-opacity duration-200"
              style={{ background: "var(--primary)", color: "#FEFEFE", borderRadius: "10px" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Задать вопрос
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.q}
                className="transition-all duration-200"
                style={{
                  background: isOpen ? "var(--card)" : "var(--background)",
                  border: "1px solid " + (isOpen ? "#C9DAF3" : "var(--border)"),
                  borderRadius: "14px",
                  boxShadow: isOpen ? "0 10px 30px rgba(3,69,155,0.07)" : "none",
                }}
              >
                <button
                  className="w-full text-left px-5 sm:px-6 py-3 sm:py-3.5 flex items-center gap-4"
                  style={{ cursor: "pointer", background: "transparent" }}
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-sora text-xs font-600 shrink-0 w-5" style={{ color: isOpen ? "var(--primary)" : "var(--muted-foreground)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm sm:text-[15px] font-600" style={{ color: "var(--foreground)" }}>{faq.q}</span>
                  <span
                    className="shrink-0 flex items-center justify-center text-lg leading-none transition-all duration-200"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isOpen ? "var(--primary)" : "var(--primary-light)",
                      color: isOpen ? "#FEFEFE" : "var(--primary)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <div className="faq-body" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p className="text-sm sm:text-[15px] leading-relaxed pl-[56px] sm:pl-[60px] pr-6 pb-4" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
