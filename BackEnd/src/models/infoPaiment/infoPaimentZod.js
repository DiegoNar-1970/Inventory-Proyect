import { z } from 'zod';

const hourDetailSchema = z.object({
  totalHours: z.number().nullable().optional(),
  typeHour: z.string().nullable().optional(),
  comissions: z.string().nullable().optional(),
  paiExtraForHour: z.number().nullable().optional(),
  paiOfHours: z.number().nullable().optional(),
  paiForHourComission: z.number().nullable().optional(),
});

const workHoursItemSchema = z.object({
  _id: z.string().nullable(),
  comissionForNigthShift: z.number().nullable().optional(),
  calcHoursTotal: z.number().nullable().optional(),
});

const infoWorkHoursSchema = z.object({
  type: z.array(workHoursItemSchema).nullable(), 
});


const newsItemSchema = z.object({
  _id: z.object({
    extraHours: z.string().nullable(),
    comissions: z.string().nullable(),
  }),
  commissionHours: z.number().nullable(),
  calcHoursTotal: z.number().nullable(),
});

const newsInfoSchema = z.object({
  news: z.array(newsItemSchema).nullable(),
  newsStartWeek: z.number().nullable().default(null),
  newsEndWeek: z.number().nullable().default(null),
});

export const infoPaiScheZod = z.object({
  employee: z.string().length(24).optional(), 
  News: newsInfoSchema,
  dayTimeHoliday: hourDetailSchema.nullable(),
  nightHoliday: hourDetailSchema.nullable(),
  dayTimeOvertime: hourDetailSchema.nullable(),
  nightOvertime: hourDetailSchema.nullable(),
  WorkHour: z.object({
    workHours: z.array(workHoursItemSchema).nullable(),
    startWeekworkHour: z.number().nullable(),
    endWeekWorkHour: z.number().nullable(),
  }).nullable(),
  paiForComissions: z.number().nullable(),
  totalPaiment: z.number().nullable(),
  paiDayShift: z.object({
    pai: z.number(),
    hrs: z.number(),
    type: z.string(),
  }).nullable(),
  paiNigthShift: z.object({
    pai: z.number(),
    hrs: z.number(),
    type: z.string(),
  }).nullable(),
  paiDominicalShift: z.object({
    pai: z.number(),
    hrs: z.number(),
    type: z.string(),
  }).nullable(),
  paiNigthDominicalShift: z.object({
    pai: z.number(),
    hrs: z.number(),
    type: z.string(),
  }).nullable(),
  deducctions:z.object({
    pension: z.number(),
    salud: z.number()
  }),
  auxTransportHrs:z.number(),
  paiOutDeductions:z.number(),
  totalHrs:z.number(),
  auxTransportPai:z.number(),
});

// Funciones de validación
export function validatePayment(input) {
  return infoPaiScheZod.safeParse(input);
}

export function validPartialInfoP(input) {
  return infoPaiScheZod.partial().safeParse(input);
}