import { z } from 'zod';

const permissionSche = z.object({
employee: z.object(),
reason: z.string(),
paiState: z.boolean(),
paiValue: z.number().min(0).max(999999999),
startDate: z.date().optional(),
  fechaFin: z.date()
});

export function validatePermissions (input) {
    return permissionSche.safeParse(input)
  }
  
  export function validatePartiaPermissions (input) {
    return permissionSche.partial().safeParse(input)
  }
  