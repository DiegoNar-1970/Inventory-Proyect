const infoPaiScheZod = z.object({
    employee: z.string().optional(),
    week: z.array(z.number().nonnegative()).nonempty(),

    horasDominicales: z.array(z.object({
        hours: z.number().nonnegative(),
        paimentForHour: z.number().nonnegative()
    })),

    horasDominicalesNocturnas: z.array(z.object({
        hours: z.number().nonnegative(),
        paimentForHour: z.number().nonnegative()
    })),

    horasDiurnas: z.array(z.object({
        hours: z.number().nonnegative(),
        paimentForHour: z.number().nonnegative()
    })),

    horasNocturnas: z.array(z.object({
        hours: z.number().nonnegative(),
        paimentForHour: z.number().nonnegative()
    })),

    horasExtras: z.array(z.object({
        hours: z.number().nonnegative(),
        paimentForHour: z.number().nonnegative()
    })),

    date: z.date().optional(),
    sueldoBasico: z.number().nonnegative().optional(),
    pagoHoras: z.number().nonnegative().optional(),
    sueldoTotal: z.number().nonnegative().optional()
});

export function validatePayment(input) {
    return infoPaiScheZod.safeParse(input);
}
export function validPartialInfoP(input){
    return infoPaiScheZod.partial().safeParse(input);
}