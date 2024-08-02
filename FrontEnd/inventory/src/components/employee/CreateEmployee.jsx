import { useForm } from 'react-hook-form';


const CreateEmployee = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onSubmit=handleSubmit((data)=>{
        console.log(data)
      })

  return (
        <form className='flex flex-col gap-2' onSubmit={onSubmit}>
            <div className='flex flex-col gap-2'>
                <div>
                    <h1 className='text-[19px] font-medium font-sans'>Perfil del empleado</h1>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="cc" className='font-sans '>Cedula</label>
                    <input type="text" className='border-[1px] rounded-lg p-[2px] border-gray-400 
                    text-gray-600'
                    {...register('cc',{required:{
                    value:true,
                    message:'Campo Requerido'
                    },minLength:{
                    value:1,
                    message:'identificacion invalida'
                    }
                    })} />
                    {errors.cc && <span className='text-red-600'>{errors.cc.message}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='font-sans'>Nombre</label>
                    <input type="text" {...register('name',{
                    required:{
                    value:true,
                    message:'Campo Requerido'
                    }})
                    } className="border-[1px] rounded-lg p-[2px] 
                    border-gray-400"/>
                    {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="lastName" className=' font-sans '>Apellido</label>
                    <input type="text" {...register('lastName',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"  />
                    {errors.lastName && <span className='text-red-600'>{errors.lastName.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="birthdate" className=' font-sans '>Fecha de nacimiento</label>
                    <input type="text" {...register('birthdate',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"  />
                    {errors.birthdate && <span className='text-red-600'>{errors.birthdate.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="sex" className=' font-sans '>Sexo</label>
                    <input type="text" {...register('sex',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"  />
                    {errors.sex && <span className='text-red-600'>{errors.sex.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="phone" className=' font-sans '>Telefono</label>
                    <input type="text" {...register('phone',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="email" className=' font-sans '>Correo</label>
                    <input type="text" {...register('email',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.email && <span className='text-red-600'>{errors.email.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="eps" className=' font-sans '>Eps</label>
                    <input type="text" {...register('eps',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.eps && <span className='text-red-600'>{errors.eps.message}</span>} 
                </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className='text-[19px] font-medium font-sans'>Cargo y area</h1>
                </div>
                <div className='flex flex-wrap gap-2'>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="position" className=' font-sans '>Cargo</label>
                    <input type="text" {...register('position',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.position && <span className='text-red-600'>{errors.position.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="area" className=' font-sans '>Area</label>
                    <input type="text" {...register('area',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.area && <span className='text-red-600'>{errors.area.message}</span>} 
                </div>
                <div className='flex flex-col gap-2'> 
                    <label htmlFor="shift" className=' font-sans '>Turno</label>
                    <input type="text" {...register('shift',{required:{
                    value:true,
                    message:'Campo Requerido'
                    }})} className="border-[1px] rounded-lg p-[2px]
                border-gray-400"/>
                    {errors.shift && <span className='text-red-600'>{errors.shift.message}</span>} 
                </div>
                </div>
            </div>
            <div>
                <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button>
            </div>
            </form>

    
  )
}

export default CreateEmployee