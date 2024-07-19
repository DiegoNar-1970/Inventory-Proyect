import { z } from "zod";

const holidaySchema = z.object({
  isHoliday: z.boolean(),
  hrsHoliday: z.number()
});

// Definición del esquema principal
const workHourSchemaZod = z.object({
  employee: z.string().optional(),
  dayHour: z.number().min(0).max(24).optional().default(0),
  week: z.number(),
  date: z.string().optional(),
  holiday: holidaySchema.optional().default(undefined)
});

export function vWorkHourSchemaZod(input) {
  return workHourSchemaZod.safeParse(input);
}

export function vPworkHourSchemaZod(input) {
  return workHourSchemaZod.partial().safeParse(input);
}