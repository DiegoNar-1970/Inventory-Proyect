import { z } from "zod";

// Definición del esquema principal
const workHourSchemaZod = z.object({
  employee: z.string(),
  week: z.number(),
  creationDate: z.string().optional(),
  holiday: z.boolean().default(false),
  leaveWork: z.string(),
  checkTime: z.string(),
});

export function vWorkHourSchemaZod(input) {
  return workHourSchemaZod.safeParse(input);
}

export function vPworkHourSchemaZod(input) {
  return workHourSchemaZod.partial().safeParse(input);
}