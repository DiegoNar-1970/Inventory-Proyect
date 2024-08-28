import { useForm } from 'react-hook-form';

const FormUpEmployee = ({item}) => {
  const {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit=handleSubmit((data)=>{
    console.log(data)
  })
  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="area" className='text-[20px]  font-medium font-sans '>Area</label>
        <input type="text" className='border-[1px] rounded-lg p-[2px] border-gray-400 
        text-gray-600'
        {...register('area',{required:{
          value:true,
          message:'Se necesita un area'
        },minLength:{
          value:2,
          message:'debe tener al menos dos caracteres'
        }
        })} defaultValue={item.area} />
        {errors.area && <span className='text-red-600'>{errors.area.message}</span>}
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="position" className='font-medium font-sans '>Cargo</label>
        <input type="text" {...register('position',{
          required:{
            value:true,
            message:'Se necesita el cargo'
        }})
        } className="border-[1px] rounded-lg p-[2px] 
        border-gray-400"
        defaultValue={item.position}/>
        {errors.position && <span className='text-red-600'>{errors.position.message}</span>}
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="baseSalary" className='font-medium font-sans '>Salario Base</label>
        <input type="number" {...register('baseSalary',{required:{
          value:true,
          message:'"Dia" o "Noche" Se necesita un turno '
        }})} className="border-[1px] rounded-lg p-[2px]
        border-gray-400"  defaultValue={item.baseSalary}/>
        {errors.baseSalary && <span className='text-red-600'>{errors.baseSalary.message}</span>} 
      </div>
    </form>
  )
}

export default FormUpEmployee