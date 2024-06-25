import { z } from 'zod';

const vacationsSchema = z.object({
    employee: z.object(),
    vacationsPai: z.number().min(0).max(999999999).nonnegative(),
    startDate: z.date().optional(),
    endDate: z.date(),
});

export function validateVacationsSche(input) {
    return vacationsSchema.safeParse(input)
  }
  
  export function validatePartialVacationsSche (input) {
    return vacationsSchema.partial().safeParse(input)
  }