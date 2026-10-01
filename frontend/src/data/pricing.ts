// Demo tariffs for the delivery calculator (fictional portfolio data).

export const PRICING = [
  { category: "Документы и образцы", weight: "до 2 кг", sea: "—", rail: "$8 / кг", air: "$14 / кг", note: "Доступна экспресс-доставка" },
  { category: "Небольшие посылки", weight: "2 – 30 кг", sea: "$3.20 / кг", rail: "$5.50 / кг", air: "$11 / кг", note: "От двери до двери" },
  { category: "Коммерческие грузы", weight: "30 – 500 кг", sea: "$2.10 / кг", rail: "$3.80 / кг", air: "$9 / кг", note: "Таможенное оформление — по запросу" },
  { category: "Полный контейнер (FCL)", weight: "500 кг+", sea: "от $1,800", rail: "от $2,400", air: "По запросу", note: "20 / 40 футов" },
];

export const MODES = [
  { key: "sea", label: "Море", title: "Морская ставка", days: "35–45 дней" },
  { key: "rail", label: "Ж/д", title: "Ж/д ставка", days: "18–25 дней" },
  { key: "air", label: "Авиа", title: "Авиаставка", days: "5–10 дней" },
] as const;

export type Mode = (typeof MODES)[number]["key"];

export const QUICK_WEIGHTS = [2, 25, 150, 500];
export const TIER_SAMPLE_WEIGHT = [1, 15, 150, 500];

export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function tierFor(weight: number) {
  if (weight <= 2) return 0;
  if (weight <= 30) return 1;
  if (weight < 500) return 2;
  return 3;
}

export function estimate(mode: Mode, weight: number) {
  const tier = tierFor(weight);
  const raw = PRICING[tier][mode];
  if (raw === "—") return { tier, kind: "na" as const };
  if (!raw.includes("$")) return { tier, kind: "request" as const };
  const num = Number(raw.replace(/[^0-9.]/g, ""));
  if (raw.startsWith("от ")) return { tier, kind: "container" as const, total: num, rate: raw };
  return { tier, kind: "perKg" as const, total: num * weight, rate: raw };
}
