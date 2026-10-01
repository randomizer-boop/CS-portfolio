export type Transport = "sea" | "rail" | "air";

export default function TransportIcon({ type, size = 18 }: { type: Transport; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (type === "rail") {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="13" rx="3" />
        <path d="M5 10h14M9 20l-2 2M15 20l2 2M8 16l-1 4M16 16l1 4" />
        <circle cx="9" cy="13" r="0.6" fill="currentColor" />
        <circle cx="15" cy="13" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (type === "air") {
    return (
      <svg {...common}>
        <path d="M10.5 13.5 3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5" />
        <path d="M6 17l-2 2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 17l2 4h14l2-4-9-3-9 3z" />
      <path d="M6 15V9h12v6M12 9V4M9 6h6" />
    </svg>
  );
}
