'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { LogoCRC } from './logo-crc';
import { LocaleSwitcher } from './locale-switcher';

const NAV_ITEMS = [
  { href: '/filosofia', key: 'filosofia' },
  { href: '/servicios', key: 'servicios' },
  { href: '/equipo', key: 'equipo' },
  { href: '/publicaciones', key: 'publicaciones' },
  { href: '/blog', key: 'blog' },
  { href: '/contacto', key: 'contacto' },
] as const;

export function SiteNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoCRC size="md" />
          <div className="hidden sm:block">
            <div className="text-[11px] font-bold uppercase tracking-wide leading-none">
              Cycling Research
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wide leading-tight mt-0.5">
              Center
            </div>
          </div>
          <span className="sm:hidden text-xs font-bold uppercase tracking-wide">
            CRC
          </span>
        </Link>

        <nav className="hidden md:flex gap-5 lg:gap-6 text-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-muted hover:text-foreground transition-colors'
                }
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2"
              aria-label={t('openMenu')}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">{t('menuTitle')}</SheetTitle>
              <SheetDescription className="sr-only">
                {t('menuDescription')}
              </SheetDescription>
              <nav className="flex flex-col gap-0 mt-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="min-h-[56px] flex items-center px-2 text-base font-medium border-b border-border-subtle"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-border">
                <LocaleSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
