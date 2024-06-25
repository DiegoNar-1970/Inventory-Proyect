import z from "zod";

const workHourSchemaZod = z.object({
    employee: z.object(),
    week: z.number(),
    dayHour: z.number().min(0).max(24).optional(),
    date:z.date().optional(),
    holiday:z.array().optional()
  });

  export function vWorkHourSchemaZod (input) {
    return workHourSchemaZod.safeParse(input)
  }
  
  export function vPworkHourSchemaZod (input) {
    return workHourSchemaZod.partial().safeParse(input)
  }