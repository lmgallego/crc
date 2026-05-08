type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, number> = { sm: 32, md: 36, lg: 48 };

export function LogoCRC({
  size = "md",
  variant = "default",
}: {
  size?: Size;
  variant?: "default" | "inverse";
}) {
  const dimensions = SIZES[size];
  const ringColor = variant === "inverse" ? "#0E0E0C" : "#E8D24A";
  const figureColor = variant === "inverse" ? "#E8D24A" : "#0E0E0C";

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: dimensions, height: dimensions, background: ringColor }}
      aria-label="Cycling Research Center"
      role="img"
    >
      <svg
        width={dimensions * 0.6}
        height={dimensions * 0.6}
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
      >
        <path
          d="M5 14 Q 6 10, 9 9 L 12 6 Q 13 5, 14 5.5 Q 15 6, 14.5 7 L 13 9 L 15 11 L 17 13"
          stroke={figureColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="13" cy="6" r="1.6" fill={figureColor} />
      </svg>
    </div>
  );
}
