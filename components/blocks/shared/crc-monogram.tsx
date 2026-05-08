type Size = "md" | "lg";

const SIZES: Record<Size, number> = { md: 80, lg: 144 };

export function CRCMonogram({ size = "md" }: { size?: Size }) {
  const dimensions = SIZES[size];
  const fontSize = dimensions * 0.32;

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{
        width: dimensions,
        height: dimensions,
        background: "#0E0E0C",
        color: "#E8D24A",
      }}
      aria-label="CRC"
      role="img"
    >
      <span
        style={{
          fontFamily: "var(--font-serif), serif",
          fontStyle: "italic",
          fontSize,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        CRC
      </span>
    </div>
  );
}
