import { useState } from "react";
import TransportIcon from "./TransportIcon";
import { MODES, PRICING, QUICK_WEIGHTS, TIER_SAMPLE_WEIGHT, estimate, money, type Mode } from "../data/pricing";
import { scrollToSection } from "../lib/scroll";
import { PREFILL_CONTACT_EVENT } from "../lib/events";

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("rail");
  const [weight, setWeight] = useState(120);
  const current = MODES.find((m) => m.key === mode)!;
  const result = estimate(mode, weight);
  const tierRow = PRICING[result.tier];

  const sendToManager = () => {
    const priceText =
      result.kind === "perKg" || result.kind === "container" ? `≈ от ${money(result.total)}` : "стоимость по запросу";
    const message = `Расчёт с сайта: ${current.label}, ${weight} кг (${tierRow.category.toLowerCase()}), ${priceText}. Хочу уточнить детали.`;
    window.dispatchEvent(new CustomEvent(PREFILL_CONTACT_EVENT, { detail: message }));
    scrollToSection("contact");
  };

  return (
    <section id="pricing" className="py-11 md:py-14 px-6 md:px-12" style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-sm font-500 mb-3" style={{ color: "var(--primary)" }}>Калькулятор доставки</div>
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-4 lg:gap-12 items-start mb-8">
          <h2 className="font-sora font-600 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", color: "var(--foreground)", letterSpacing: "-0.015em" }}>
            Рассчитайте стоимость доставки
          </h2>
          <p className="text-base leading-relaxed lg:max-w-md lg:justify-self-end lg:pt-1" style={{ color: "var(--secondary-foreground)", fontWeight: 300 }}>
            Выберите способ и вес груза — калькулятор покажет цену и срок. Расчёт можно сразу отправить в заявку.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5">
          {/* Calculator */}
          <div className="p-5 md:p-6" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "20px" }}>
            <div className="text-xs font-600 mb-3" style={{ color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Способ доставки
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6" role="tablist">
              {MODES.map((m) => {
                const active = mode === m.key;
                return (
                  <button
                    key={m.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMode(m.key)}
                    className="flex flex-col items-center gap-0.5 py-2.5 transition-all duration-200"
                    style={{
                      background: active ? "var(--primary)" : "var(--background)",
                      color: active ? "#FEFEFE" : "var(--foreground)",
                      border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <TransportIcon type={m.key} size={22} />
                    <span className="text-sm font-600">{m.label}</span>
                    <span className="text-xs" style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{m.days}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 mb-3">
              <label htmlFor="weight" className="text-xs font-600" style={{ color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Вес груза
              </label>
              <div className="flex items-baseline gap-1.5">
                <input
                  id="weight"
                  type="number"
                  min={1}
                  max={20000}
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Math.min(20000, Number(e.target.value) || 1)))}
                  className="font-sora font-600 text-right outline-none w-24 px-2 py-1"
                  style={{ fontSize: "1.5rem", color: "var(--foreground)", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px" }}
                />
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>кг</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={1000}
              value={Math.min(weight, 1000)}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full calc-range"
              aria-label="Вес груза, кг"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {QUICK_WEIGHTS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className="text-xs font-500 px-3 py-1.5 transition-all duration-150"
                  style={{
                    background: weight === w ? "var(--primary-light)" : "transparent",
                    color: weight === w ? "var(--primary)" : "var(--secondary-foreground)",
                    border: "1px solid " + (weight === w ? "#C9DAF3" : "var(--border)"),
                    borderRadius: "999px",
                    cursor: "pointer",
                  }}
                >
                  {w} кг
                </button>
              ))}
            </div>

            {/* Result */}
            <div className="mt-6 p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ background: "var(--primary)", borderRadius: "16px" }}>
              <div key={`${mode}-${result.tier}-${result.kind}`} className="price-fade">
                <div className="text-xs font-500 mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {tierRow.category} · {current.label} · {current.days}
                </div>
                {result.kind === "perKg" || result.kind === "container" ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>от</span>
                      <span className="font-sora font-600" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.4rem)", color: "#FEFEFE", letterSpacing: "-0.02em" }}>
                        {money(result.total)}
                      </span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {result.kind === "perKg" ? `${result.rate} × ${weight} кг` : `за контейнер 20 / 40 футов`}
                    </div>
                  </>
                ) : result.kind === "request" ? (
                  <div className="font-sora font-600 text-2xl" style={{ color: "#FEFEFE" }}>Цена по запросу</div>
                ) : (
                  <>
                    <div className="font-sora font-600 text-xl" style={{ color: "#FEFEFE" }}>Морем не отправляем</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Для документов и образцов выберите Ж/д или Авиа</div>
                  </>
                )}
              </div>
              {result.kind !== "na" && (
              <button
                onClick={sendToManager}
                className="text-sm font-600 px-5 py-3 shrink-0 transition-all duration-200"
                style={{ background: "#FEFEFE", color: "var(--primary)", borderRadius: "10px", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Отправить расчёт →
              </button>
              )}
            </div>
          </div>

          {/* Tariff list */}
          <div className="p-5 md:p-6 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "20px" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-sora font-600 text-base" style={{ color: "var(--foreground)" }}>Тарифы</div>
              <span className="text-xs font-600 px-2.5 py-1" style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: "999px" }}>
                <span className="inline-flex items-center gap-1.5"><TransportIcon type={mode} size={14} />{current.title}</span>
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {PRICING.map((row, index) => {
                const active = index === result.tier;
                return (
                  <button
                    key={row.category}
                    onClick={() => setWeight(TIER_SAMPLE_WEIGHT[index])}
                    className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 transition-all duration-200"
                    style={{
                      background: active ? "var(--primary-light)" : "transparent",
                      border: "1px solid " + (active ? "#C9DAF3" : "var(--border)"),
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div className="text-sm font-600" style={{ color: "var(--foreground)" }}>{row.category}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{row.weight} · {row.note}</div>
                    </div>
                    <div className="text-sm font-600 whitespace-nowrap" style={{ color: active ? "var(--primary)" : "var(--foreground)" }}>
                      {row[mode] === "—" ? "—" : row[mode]}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs leading-relaxed mt-4" style={{ color: "var(--muted-foreground)" }}>
              * Тарифы ориентировочные. Итоговая стоимость зависит от направления, характеристик груза и дополнительных услуг.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
