
import Employee from '../models/employee/employee.js'
import {EmployeeModel} from '../models/employee/employee.js'

export class employeeController{

    static async getAll (req,res) {
        const {id}=req.query;
        if(id){
            try{
                const employeeId = await Employee.findById(id,{__v:0}).populate('profile',
                    { _id:0, __v:0});
                    
                return res.status(201).json(employeeId)
                    ;
            }catch(err){
                return res.status(404).json({message:"Employee not Found"});
            }
        }
        
        try{
            const allEmployees= await Employee.find({},{__v:0}).populate('profile',
                { _id:0,__v:0}
            );

            res.send(allEmployees)
        }catch(err){
            
           return res.status(400).json({message:'Bad request'})
           ;
        }
        
    }
    static async create (req,res){
       const {id}=req.query;
       if(!id || id===undefined || id===null){
        return res.status(400).json({message:'profile required'})
       }
       try{
        const employee=await EmployeeModel.create(id,req.body);
            if(employee.message){
                return send.status(401).json(employee.err);
            }
            return res.status(201).json(employee);
       }catch(err){
            return res.status(400).json({message:'Bad request'})
       }

    }
    static async update(req,res){
        try{
            const result=req.body;
            const {id} =req.params;
            const employeeUpd= await EmployeeModel.findByIdAndUpdate(id,result);
            console.log(employeeUpd)
            return res.send(employeeUpd) ;
        }catch(err){
            res.status(404).json({message:err.message})
        }

    }

    static async delete(req,res){
        try{
            const {id}=req.params
            await EmployeeModel.fidnAndDelete(id);
            return res.status(201).json({message:'Employee deleted'})
            ;
        }catch(err){
            res.status(404).json({message:err})
        }

    }
}