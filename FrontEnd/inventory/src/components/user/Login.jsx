// import { useState } from "react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
const url='/login'


const Login = () => {
    const navigate = useNavigate()
    const {fetchLogin,error,user,isAuthenticated}=useContext(AuthContext);
    const {register,handleSubmit,formState:{errors}}=useForm()
    
    useEffect(()=>{
        console.log('usuario',user)
        if(isAuthenticated) navigate(`/employee/${user.redirection}`)
        
    },[isAuthenticated])
    
        const onSubmit = handleSubmit ( (userForm) => {
            fetchLogin(url,userForm)
        });
        
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#202124] z-10 flex flex-col items-center justify-start  ">
            <form onSubmit={onSubmit} className="m-auto p-auto flex flex-col gap-[20px] bg-[#1b1b1b] p-[10px] shadow-shadow1
            rounded-[1em] w-[300px] outline outline-[#1b1b1bf7]">
                <div className="text-center">
                   <h1 className= 'mb-2 text-white' >Inicion de sesion </h1>
                   {error ?
                        <div className="rounded-[1em] bg-red-700 text-white p-2 w-[100%]">
                            <p>{error}</p>
                        </div>
                        :''
                    }
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
                    <button className=" text-white rounded-[1em] p-1 w-full bg-[#22c55e39] outline outline-[1px] outline-[#22c55e]
                     hover:bg-[#22c55e] duration-200">Login</button>
                </div>
            </form>
    </div>
  )
}

export default Login