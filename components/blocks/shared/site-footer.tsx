import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoCRC } from './logo-crc';

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <LogoCRC size="sm" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide leading-none text-background">
                  Cycling Research
                </div>
                <div className="text-[10px] text-background/60 uppercase tracking-wide mt-0.5">
                  Center
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm leading-relaxed text-background/65 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.sectionsTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><Link href="/filosofia">{t('nav.filosofia')}</Link></li>
              <li><Link href="/servicios">{t('nav.servicios')}</Link></li>
              <li><Link href="/equipo">{t('nav.equipo')}</Link></li>
              <li><Link href="/publicaciones">{t('nav.publicaciones')}</Link></li>
              <li><Link href="/blog">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.servicesTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><Link href="/servicios/coaching">Coaching</Link></li>
              <li><Link href="/servicios/investigacion">{t('services.research')}</Link></li>
              <li><Link href="/servicios/training-camps">Training Camps</Link></li>
              <li><Link href="/servicios/formacion">{t('services.education')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.contactTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><a href="mailto:info@crc.org">info@crc.org</a></li>
              <li><a href="#" target="_blank" rel="noopener">ORCID</a></li>
              <li><a href="#" target="_blank" rel="noopener">Google Scholar</a></li>
              <li><a href="#" target="_blank" rel="noopener">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-background/15 flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-background/40">
          <span>© Cycling Research Center 2026</span>
          <span className="hidden md:inline">Univ. Granada · Barcelona · Alicante</span>
          <span>España</span>
        </div>
      </div>
    </footer>
  );
}
