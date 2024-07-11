import {useForm} from 'react-hook-form'

const FormHour = ({item:{dataItem}}) => {
    const {register,handleSubmit,formState:{errors},watch }=useForm();

    const onSubmit=handleSubmit((data)=>{
      console.log('esta es la data nmms',data)
    })

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
    <div className='hidden gap-2'>
      <label htmlFor="employee" className='text-[20px]  font-medium font-sans '></label>
      <input type="text" className='border-[1px] text-black rounded-lg p-[2px] border-gray-400'
        {...register('employee')} defaultValue={dataItem._id} />
    </div>
     <div className='flex flex-col gap-2'>
          <label htmlFor="week" className='font-medium font-sans '>Semana</label>
          <input type="number" {...register('week',{
            required:{
              value:true,
              message:'Se necesita una semana'
          }})
          } className="border-[1px] rounded-lg p-[2px] border-gray-400" />
          {errors.week && <span className='text-red-600'>{errors.week.message}</span>}
    </div>
    {watch('isHoliday') == false && (
            <div className='flex flex-col gap-2'>
            <label htmlFor="lastName" className='font-medium font-sans '>Horas</label>
            <input type="text" {...register('dayHour',{required:{
              value:true,
              message:'Se necesita el total de horas'
            },maxLength:{
                value:24,
                message:'debe ser menor de 24 horas'
            },minLength:{
                value:0,
                message:'solo horas mayores a 0'
            }})}
            className="border-[1px] rounded-lg p-[2px] border-gray-400"  />
            {errors.dayHour && <span className='text-red-600'>{errors.dayHour.message}</span>} 
          </div>
     )}
     {watch('isHoliday') == true && (
                <div className='flex flex-col gap-2'>
                    <label htmlFor="isHoliday" className='font-medium font-sans '>Horas festivas</label>
                    <input type="number" {...register('hrsHoliday',{
                        required:{
                        value:true,
                        message:'Se necesita una semana'
                    }})
                    } className="border-[1px] rounded-lg p-[2px] border-gray-400" />
                    {errors.week && <span className='text-red-600'>{errors.week.message}</span>}
                </div>
            )}
  <div className='flex flex-col gap-2'>
    <label htmlFor="sex" className='font-medium font-sans '>Sexo</label>
    <input type="text" {...register('sex',{
      required:{
        value:true,
        message:'Se necesita un sexo'
    }})
    } className="border-[1px] rounded-lg p-[2px] border-gray-400"/>
    {errors.sex && <span className='text-red-600'>{errors.sex.message}</span>}
  </div>
  <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button>
  <div className='flex flex-col gap-2'>
        <div className=' flex gap-2 items-center justify-between'>
            <span className='font-medium font-sans '>Marcar solo si es festivo</span>
            <input type="checkbox" {...register('isHoliday')} className="border-[1px] rounded-lg p-[2px] border-gray-400"/>
        </div>
  </div>
</form>
  )
}

export default FormHour