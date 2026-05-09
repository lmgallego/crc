'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactSchema, QUERY_TYPES, type ContactInput } from '@/lib/contact/schema';
import { sendContactEmail } from '@/app/[locale]/contacto/_actions/send-contact-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'fallback';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tTypes = useTranslations('contact.queryTypes');
  const params = useSearchParams();
  const initialType = (params.get('type') as ContactInput['queryType']) ?? 'coaching';
  const validInitial = QUERY_TYPES.includes(initialType) ? initialType : 'coaching';
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      queryType: validInitial,
      message: '',
      consent: undefined as unknown as true,
    },
  });

  const onSubmit = (data: ContactInput) => {
    setStatus('submitting');
    setErrorMsg('');
    startTransition(async () => {
      const res = await sendContactEmail(data);
      if (res.ok) {
        setStatus('success');
        reset();
      } else if (res.fallback) {
        setStatus('fallback');
      } else {
        setStatus('error');
        setErrorMsg(res.error ?? '');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="border border-border rounded-md p-6 bg-accent/10">
        <p className="font-serif text-xl">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label={t('name')} error={errors.name && t('errors.required')}>
        <Input {...register('name')} className="h-11" autoComplete="name" />
      </Field>

      <Field
        label={t('email')}
        error={
          errors.email
            ? errors.email.message?.includes('email')
              ? t('errors.invalidEmail')
              : t('errors.required')
            : undefined
        }
      >
        <Input
          type="email"
          {...register('email')}
          className="h-11"
          autoComplete="email"
        />
      </Field>

      <Field label={t('organization')}>
        <Input {...register('organization')} className="h-11" />
      </Field>

      <Field label={t('queryType')}>
        <select
          {...register('queryType')}
          className="w-full h-11 px-3 border border-border rounded-md bg-background text-sm"
        >
          {QUERY_TYPES.map((q) => (
            <option key={q} value={q}>
              {tTypes(camelize(q))}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label={t('message')}
        error={errors.message ? t('errors.tooShort') : undefined}
      >
        <Textarea {...register('message')} rows={6} />
      </Field>

      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="consent"
          {...register('consent')}
          className="mt-1"
        />
        <Label htmlFor="consent" className="text-xs leading-snug text-foreground/80">
          {t('consent')}
        </Label>
      </div>
      {errors.consent ? (
        <p className="text-xs text-accent-dark">{t('errors.consentRequired')}</p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? t('submitting') : t('submit')} →
      </Button>

      {status === 'fallback' ? (
        <p className="text-sm text-foreground/80 mt-3">{t('fallback')}</p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-accent-dark mt-3">
          {t('errorGeneric')} {errorMsg ? `(${errorMsg})` : ''}
        </p>
      ) : null}
    </form>
  );
}

function camelize(s: string): 'coaching' | 'trainingCamp' | 'research' | 'education' | 'press' | 'collaboration' | 'other' {
  const map: Record<string, ReturnType<typeof camelize>> = {
    coaching: 'coaching',
    'training-camp': 'trainingCamp',
    research: 'research',
    education: 'education',
    press: 'press',
    collaboration: 'collaboration',
    other: 'other',
  };
  return map[s] ?? 'other';
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className={cn('data-label', error && 'text-accent-dark')}>
        {label}
      </Label>
      {children}
      {error ? <p className="text-xs text-accent-dark">{error}</p> : null}
    </div>
  );
}
