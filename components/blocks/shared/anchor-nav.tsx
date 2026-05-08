export function AnchorNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav className="mt-8 md:mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="hover:text-foreground transition-colors"
        >
          ↓ {item.label}
        </a>
      ))}
    </nav>
  );
}
