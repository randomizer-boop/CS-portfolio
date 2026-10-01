import { useEffect, useState, type FormEvent } from "react";
import { createContactRequest } from "../api/contactRequests";
import { PREFILL_CONTACT_EVENT } from "../lib/events";

const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setSubmitted(false);
      setForm((prev) => ({ ...prev, message }));
    };
    window.addEventListener(PREFILL_CONTACT_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_CONTACT_EVENT, onPrefill);
  }, []);

  const errors = {
    name: form.name.trim() ? "" : "Укажите имя",
    phone: !form.phone.trim() ? "Укажите номер телефона" : PHONE_RE.test(form.phone.trim()) ? "" : "Проверьте номер: только цифры, +, пробелы",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (errors.name || errors.phone || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await createContactRequest({
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim() || null,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", message: "" });
    setTouched({ name: false, phone: false });
    setSubmitted(false);
  };

  const inputStyle = (invalid: boolean) => ({
    background: "rgba(255,255,255,0.08)",
    border: `1px solid ${invalid ? "#FFB4B4" : "rgba(255,255,255,0.18)"}`,
    borderRadius: "10px",
    color: "#FEFEFE",
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <section id="contact" className="py-11 md:py-16 px-6 md:px-12" style={{ background: "var(--primary)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20">
        <div>
          <div className="text-sm font-500 mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Обсудим задачу</div>
          <h2 className="font-sora font-600 leading-tight mb-5" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)", color: "#FEFEFE", letterSpacing: "-0.015em" }}>
            Расскажите, что нужно привезти из Китая
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            Оставьте контакт и кратко опишите задачу. Мы покажем, как можно выстроить закупку и доставку под ваш запрос.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: "🧭", label: "Что можно обсудить", val: "Поставщик · закупка · контроль · доставка" },
              { icon: "🤝", label: "Формат", val: "Для бизнеса и частных клиентов" },
              { icon: "📍", label: "Направление", val: "Китай → Россия · Казахстан · СНГ" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px" }}>
                <span className="flex items-center justify-center shrink-0 text-lg" style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(255,255,255,0.12)" }} aria-hidden>
                  {item.icon}
                </span>
                <div>
                  <div className="text-xs font-500 mb-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{item.label}</div>
                  <div className="text-sm font-500" style={{ color: "#FEFEFE" }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 lg:self-start lg:sticky lg:top-28" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "20px" }}>
          {submitted ? (
            <div className="flex flex-col justify-center h-full py-10" role="status" aria-live="polite">
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6 text-2xl font-600" style={{ background: "#FEFEFE", color: "var(--primary)", boxShadow: "0 10px 28px rgba(0,0,0,0.22)" }}>✓</div>
              <div className="inline-flex w-fit text-xs font-700 mb-4 px-3 py-1 uppercase" style={{ color: "#0B3D26", background: "#8FE3B0", borderRadius: "99px", letterSpacing: "0.06em" }}>Заявка сохранена</div>
              <h3 className="font-sora font-600 mb-3" style={{ fontSize: "1.7rem", color: "#FEFEFE", letterSpacing: "-0.01em" }}>
                Спасибо, {form.name.split(" ")[0]}!
              </h3>
              <p className="mb-8" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
                Ваши контакты и описание задачи получены и переданы в обработку.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="self-start text-sm font-500 px-5 py-2.5"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#FEFEFE", borderRadius: "10px", cursor: "pointer" }}
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {[
                { id: "name", label: "Ваше имя", placeholder: "Иван Петров", type: "text", required: true },
                { id: "phone", label: "Номер телефона", placeholder: "+7 999 123 45 67", type: "tel", required: true },
                { id: "message", label: "Что вам нужно?", placeholder: "Например: найти поставщика мебели и доставить пробную партию в Алматы", type: "textarea", required: false },
              ].map((field) => {
                const key = field.id as "name" | "phone" | "message";
                const fieldError = key !== "message" && touched[key] ? errors[key] : "";
                return (
                  <div key={field.id}>
                    <label htmlFor={`f-${field.id}`} className="text-xs font-500 flex items-center justify-between mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span>
                        {field.label}
                        {field.required && <span style={{ color: "#9CC3FF" }}> *</span>}
                      </span>
                      {!field.required && <span style={{ color: "rgba(255,255,255,0.4)" }}>необязательно</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={`f-${field.id}`}
                        placeholder={field.placeholder}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="contact-input w-full px-4 py-3.5 text-sm outline-none resize-y min-h-28"
                        rows={4}
                        maxLength={5000}
                        style={inputStyle(false)}
                      />
                    ) : (
                      <input
                        id={`f-${field.id}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
                        autoComplete={field.id === "name" ? "name" : "tel"}
                        inputMode={field.id === "phone" ? "tel" : undefined}
                        aria-invalid={!!fieldError}
                        aria-describedby={fieldError ? `e-${field.id}` : undefined}
                        className="contact-input w-full px-4 py-3.5 text-sm outline-none"
                        style={inputStyle(!!fieldError)}
                      />
                    )}
                    {fieldError && (
                      <p id={`e-${field.id}`} className="text-xs mt-1.5" style={{ color: "#FFC9C9" }}>
                        {fieldError}
                      </p>
                    )}
                  </div>
                );
              })}

              {error && (
                <p className="text-sm px-4 py-3" role="alert" style={{ color: "#FFE1E1", background: "rgba(255,90,90,0.15)", borderRadius: "10px" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 font-600 px-8 py-4 text-sm mt-1 w-full transition-all duration-200"
                style={{ background: "#FEFEFE", color: "var(--primary)", borderRadius: "10px", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.75 : 1 }}
              >
                {submitting && <span className="spinner" aria-hidden />}
                {submitting ? "Отправляем…" : "Отправить заявку"}
              </button>
              <p className="text-xs text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
                Работаем Пн–Пт с 9:00 до 19:00 по времени Алматы (UTC+5) — в это время ответим.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
