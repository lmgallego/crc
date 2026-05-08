import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

export function SectionHeader({
  number,
  eyebrow,
  title,
  cta,
  ctaHref,
}: {
  number: string;
  eyebrow: string;
  title: string;
  cta?: string;
  ctaHref?: Href;
}) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8 mb-8 md:mb-12">
      <div>
        <p className="section-number">
          {number} — {eyebrow}
        </p>
        <h2 className="font-serif mt-2 text-[28px] leading-[1.05] tracking-[-0.025em] sm:text-[32px] md:text-[36px]">
          {title}
        </h2>
      </div>
      {cta && ctaHref ? (
        <Link
          href={ctaHref}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dark hover:underline underline-offset-4 self-start md:self-end"
        >
          {cta}
        </Link>
      ) : null}
    </header>
  );
}
