import {useForm} from 'react-hook-form'

const FormUpEmployee = ({item}) => {
  const {register,
          handleSubmit,
          formState:{errors}
    }=useForm();

  const onSubmit=handleSubmit((data)=>{
    console.log(data)
  })
  const {dataItem}=item;
  console.log(errors)
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
        })} defaultValue={dataItem.area} />
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
        defaultValue={dataItem.position}/>
        {errors.position && <span className='text-red-600'>{errors.position.message}</span>}
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="shift" className='font-medium font-sans '>Turno</label>
        <input type="text" {...register('shift',{required:{
          value:true,
          message:'"Dia" o "Noche" Se necesita un turno '
        }})} className="border-[1px] rounded-lg p-[2px]
        border-gray-400"  defaultValue={dataItem.shift}/>
        {errors.shift && <span className='text-red-600'>{errors.shift.message}</span>} 
      </div>
      <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button>
    </form>
  )
}

export default FormUpEmployee