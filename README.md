# Inventory-Proyect
I will use express and Mongo Db, then to learn about NoSql databases, then I will migrate to DB Sql and more

########################!!!-----Cheks-------!!!###################
make validation  [] : checkout
make error  []  
###############!!!-----code errors-------!!!###################
controllerWorkHour
i cant be a feedback
    //     const {id}=req.params;
    //     const result= req.body;;
    //     if(!result || !id){
    //         return res.status(400).json({message:'insufficient params'})
    //     }
    //     try{
    //         const newWorkH =await WorkHourModel.create(id,result.data)
    //         console.log(newWorkH);
    //         const saveNewWork=newWorkH.save();
    //         return res.send(saveNewWork), mongoose.connection.close();
    
    //     }catch(err){
    //         return res.status(400).json({message:err})            
    //     }
        
    // 
        static async create(req,res){
        const { id } = req.params;
    const result = req.body;
    if (!result || !id) {
      return res.status(400).json({ message: 'insufficient params' });
    }
    try {
      const newWorkH = await WorkHourModel.create(id, result);
      if (newWorkH.message) {
        return res.status(400).json({ message: newWorkH.message,
            error:newWorkH.error
         });
      }
      return res.status(201).json(newWorkH);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    }
    Zod from workHour 
    // import z from "zod";

// const holidaySchema = z.object({
//   isHoliday: z.boolean(),
//   holidayNumber: z.number()
// });

// const workHourSchemaZod = z.object({
//     employee: z.object().optional(),
//     week: z.number(),
//     dayHour: z.number().min(0).max(24).optional(),
//     date:z.date().optional(),
//     holiday:z.array(holidaySchema).optional
//   });

//   export function vWorkHourSchemaZod (input) {
//     return workHourSchemaZod.safeParse(input)
//   }
  
//   export function vPworkHourSchemaZod (input) {
//     return workHourSchemaZod.partial().safeParse(input)
//   }
const holidaySchema = z.object({
  isHoliday: z.boolean(),
  holidayNumber: z.number()
});

// Definición del esquema principal
const workHourSchemaZod = z.object({
  employee: z.string().optional(),
  dayHour: z.number().min(0).max(24).optional(),
  date: z.date().optional(),
  holiday: z.array(holidaySchema).optional()
});

export function vWorkHourSchemaZod(input) {
  return workHourSchemaZod.safeParse(input);
}

export function vPworkHourSchemaZod(input) {
  return workHourSchemaZod.partial().safeParse(input);
}
worHourModel
      // const result= await vWorkHourSchemaZod(data);
      //   console.log(result.error.message);
      //   if(!result.success){
      //     console.log(result.err,result);
      //       return {message:result.error.message}
      //   }
      // try{
      //   const newWorkH = await new WorkHour(data);
      //   const employee = await Employee.findById(id);
      //   newWorkH.employee=newWorkH.employee.concat(employee);
      //   return newWorkH
      // }catch(err){
      //   return {message:err}
      // }
        export class WorkHourModel
    static async create(id,data){
      console.log("Datos recibidos para la validación:", data);
      const result = vWorkHourSchemaZod(data);
      console.log("Resultado de la validación:", result);
      console.log("Resultado de la validación:", result.error);
      console.log("Resultado de la validación:", result.error.issues);
      console.log("Resultado de la validación:", result.error.errors);

      if (!result.success) {
        console.log("Error de validación:", result.error.errors);
        return { message: 'invalid type', error: result.error };
      }
      try {
        const newWorkH = new WorkHour(result.data);
        const employee = await Employee.findById(id);
        newWorkH.employee = employee;
        await newWorkH.save();
        return newWorkH;
      } catch (err) {
        console.log("Error en la creación:", err);
        return { message: err.message };
      }
    }