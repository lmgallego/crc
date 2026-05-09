import { z } from 'zod';

export const QUERY_TYPES = [
  'coaching',
  'training-camp',
  'research',
  'education',
  'press',
  'collaboration',
  'other',
] as const;

export type QueryType = (typeof QUERY_TYPES)[number];

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  organization: z.string().optional(),
  queryType: z.enum(QUERY_TYPES),
  message: z.string().min(30),
  consent: z.literal(true),
});

export type ContactInput = z.infer<typeof contactSchema>;
