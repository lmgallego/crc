'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4'] as const;

export function ContactFaq() {
  const t = useTranslations('contact.faq');
  return (
    <section className="border-t border-border bg-foreground/[0.025]">
      <div className="max-w-3xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <h2 className="data-label mb-6">{t('title')}</h2>
        <Accordion type="single" collapsible className="w-full">
          {QUESTIONS.map((k) => (
            <AccordionItem key={k} value={k} className="border-border">
              <AccordionTrigger className="font-serif text-lg md:text-xl leading-tight tracking-[-0.015em] text-left py-5 hover:no-underline">
                {t(`${k}Question`)}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-foreground/80 leading-relaxed pb-5">
                {t(`${k}Answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
