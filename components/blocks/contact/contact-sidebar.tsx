import { useTranslations } from 'next-intl';

export function ContactSidebar() {
  const tDir = useTranslations('contact.directly');
  const tFind = useTranslations('contact.findUs');
  const tLoc = useTranslations('contact.location');
  return (
    <aside className="space-y-10 md:space-y-12 md:sticky md:top-24 md:self-start">
      <section>
        <h2 className="data-label mb-4">{tDir('title')}</h2>
        <ul className="space-y-2.5 text-sm">
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted block">
              {tDir('directLabel')}
            </span>
            <a className="hover:underline underline-offset-4" href="mailto:info@crc.org">
              info@crc.org
            </a>
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted block">
              {tDir('pressLabel')}
            </span>
            <a className="hover:underline underline-offset-4" href="mailto:prensa@crc.org">
              prensa@crc.org
            </a>
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted block">
              {tDir('researchLabel')}
            </span>
            <a
              className="hover:underline underline-offset-4"
              href="mailto:research@crc.org"
            >
              research@crc.org
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="data-label mb-4">{tFind('title')}</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" target="_blank" rel="noopener" className="hover:underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener" className="hover:underline">
              ORCID
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener" className="hover:underline">
              Google Scholar
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="data-label mb-4">{tLoc('title')}</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          {tLoc('university')}
          <br />
          {tLoc('address')}
        </p>
        <p className="text-xs text-muted mt-2 italic">{tLoc('cities')}</p>
      </section>
    </aside>
  );
}
