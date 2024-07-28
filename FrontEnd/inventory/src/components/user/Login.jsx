import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { UseBodyFetch } from "../../services/UseBodyFetch";

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [formData,setFormData]=useState(null);

    const url='http://localhost:3000/login'

    const options={
        method: "POST",
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      };

    const {data}=UseBodyFetch(url,options,formData)
    console.log(data);
        const onSubmit = handleSubmit((input) => {
            setFormData(input)
        });

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#202124] z-10 flex flex-col items-center justify-start  ">
            <form onSubmit={onSubmit} className="m-auto p-auto flex flex-col gap-[20px] bg-[#1b1b1b] p-[10px] shadow-shadow1
            rounded-[1em] w-[300px] outline outline-[#1b1b1bf7]">
                <div className="m-auto p-auto flex flex-col">
                   <h1>Inicion de sesion </h1>
                </div>
                <div>
                    <span className=' mb-2 text-green-500 text-xl'>Fruty</span><span className='text-xl mb-2 text-orange-300'>Green</span>
                </div>
                <div className="text-white flex flex-col gap-2">
                    <label htmlFor="username" className="text-[#6b7280]">Usuario</label>
                    <input type="text" {...register('userName',{
                        required:{
                            value:true,
                            message:'Se necesita un usuario'
                        }
                    })} className="text-white bg-[#202124] p-2 rounded-[1em]" placeholder="User"/>
                    {errors.userName && <span className="text-red-600">{errors.userName.message}</span>}
                </div>
                <div className="text-white flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#6b7280]">Contraseña</label>
                    <input type="password" {...register('password',{
                        required: {
                            value: true,
                            message: 'Se necesita una contraseña'
                          }
                    })}className="text-white bg-[#202124]  p-2 rounded-[1em]" placeholder="Password"/>
                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                </div>
                <div className="flex justify-between text-white mt-[19px]" >
                    <Link to='/register' className="  text-orange-300 rounded-[1em] outline outline-[1px] p-[5px] 
                     hover:bg-[#fdbb741c]  hover:outline-none hover:text-orange-400 transition-all" >Registrarse</Link>
                    <button className=" text-green-300 rounded-[1em] p-1">Login</button>
                </div>
            </form>
    </div>
  )
}

export default Login