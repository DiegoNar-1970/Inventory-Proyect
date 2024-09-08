import { z } from "zod";

// Definición del esquema principal
const workHourSchemaZod = z.object({
  employee: z.string(),
  week: z.number(),
  leaveWork: z.string(),
  checkTime: z.string(),
  breakfast: z.boolean(),
  lunch: z.boolean(),
  typeHour: z.string(),
  creationDate:z.date()
});

export function vWorkHourSchemaZod(input) {
  return workHourSchemaZod.safeParse(input);
}

export function vPworkHourSchemaZod(input) {
  return workHourSchemaZod.partial().safeParse(input);
}