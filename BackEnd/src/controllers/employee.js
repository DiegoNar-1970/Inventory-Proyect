import Employee from '../models/empleado/employee.js'
import { validateEmployeeSchema } from '../models/empleado/employeeZod.js';
import Profile from '../models/perfil/profile.js';


export class employeeController{
    static async getAll (req,res) {
        try{
            const allEmployees= await Employee.find().populate('profile');
            res.send(allEmployees)
        }catch(err){
            res.status(400).json({message:'Bad request'});
        }
        
    }
    static async create (req,res){
        const result=validateEmployeeSchema(req.body)
        if(!result.success){
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }
        try{
            const {id} = req.params;
            const profile= await Profile.findById(id);
            if(!profile){
                return res.status(404).json({ message: 'Profile not found' });
            }
            const newEmploye = new Employee(result.data);
            newEmploye.profile=newEmploye.profile.concat(profile);
            const saveEmployee= await newEmploye.save();
           return res.send(saveEmployee);
        }catch(err){
            res.status(400).json({message:err});
        }
    }
}