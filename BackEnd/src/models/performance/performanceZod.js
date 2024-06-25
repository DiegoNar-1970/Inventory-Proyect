import { z } from 'zod';

const performanceSche = z.object({
  employee: z.object(),
  performance: z.string(),
  date: z.date().optional()
});
export function vPerformanceSche (input) {
    return performanceSche.safeParse(input)
  }
  
  export function vPPerformanceSche (input) {
    return performanceSche.partial().safeParse(input)
  }
  