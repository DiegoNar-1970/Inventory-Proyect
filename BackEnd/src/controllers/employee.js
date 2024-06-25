import mongoose from 'mongoose';
import Employee from '../models/employee/employee.js'
import { validateEmployeeSchema } from '../models/employee/employeeZod.js';
import Profile from '../models/profile/profile.js';


export class employeeController{

    static async getAll (req,res) {
        const {id}=req.query;
        if(id){
            try{
                const employeeId = await Employee.findById(id,{__v:0}).populate('profile',
                    {cc:1, name:1, lastName:1, sex:1,
                        phone:1, email:1, eps:1, _id:0, _v:0
                    });
                    mongoose.connection.close();
                return res.status(201).json(employeeId);
            }catch(err){
                mongoose.connection.close();
                return res.status(404).json({message:"Employee not Found"})
            }
        }
        
        try{
            const allEmployees= await Employee.find({},{__v:0}).populate('profile',
                {cc:1, name:1, lastName:1, birthdate:1, sex:1,
                    phone:1, email:1, eps:1, _id:0
                }
            );
            mongoose.connection.close();
            res.send(allEmployees)
        }catch(err){
            res.status(400).json({message:'Bad request'});
        }
        
    }
    static async create (req,res){
        const result=validateEmployeeSchema(req.body)
        if(!result.success){
            mongoose.connection.close();
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }
        try{
            const {id} = req.params;
            const profile= await Profile.findById(id);
            if(!profile){
                mongoose.connection.close();
                return res.status(404).json({ message: 'Profile not found' });
            }
            const newEmploye = new Employee(result.data);
            newEmploye.profile=newEmploye.profile.concat(profile);
            const saveEmployee= await newEmploye.save();
            mongoose.connection.close();
           return res.send(saveEmployee);
        }catch(err){
            mongoose.connection.close();
            res.status(400).json({message:err});
        }
    }
}