import {useForm} from 'react-hook-form'

const FormHour = ({item:{dataItem}}) => {
    const {register,handleSubmit,formState:{errors},watch }=useForm();

    const onSubmit = handleSubmit((data) => {

      const formattedData = {
        ...data,
        holiday: {
          isHoliday:data.isHoliday || false,
          hrsHoliday:data.hrsHoliday || 0
        } 
      };
      delete formattedData.isHoliday;
      delete formattedData.hrsHoliday;
      console.log('Datos enviados:', formattedData);
    });

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
          },valueAsNumber: true,
          max:{
            value:60,
            message:'semanas maximas 60'
          },
          min:{
            value:1,
            message:'numero no permitido'
          }
          ,pattern: {
            value: /^(0?[0-9]|1[0-2])$/, 
            message: 'Ingrese un número válido del 0 al 12'
          }, })
          } className="border-[1px] rounded-lg p-[2px] border-gray-400" />
          {errors.week && <span className='text-red-600'>{errors.week.message}</span>}
    </div>
    {!watch('isHoliday') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="dayHour" className="font-medium font-sans">Horas</label>
          <input type="number" {...register('dayHour', {
            required: {
              value: true,
              message: 'Se necesita el total de horas'
            },
            max: {
              value: 24,
              message: 'Debe ser menor de 24 horas'
            },
            min: {
              value: 0,
              message: 'Solo horas mayores a 0'
            },
            pattern: {
              value: /^(0?[0-9]|1[0-2])$/, 
              message: 'Ingrese un número válido del 0 al 12'
            },valueAsNumber: true
          })} defaultValue={0} className="border-[1px] rounded-lg p-[2px] border-gray-400" />
          {errors.dayHour && <span className="text-red-600">{errors.dayHour.message}</span>}
        </div>
      )}

      {watch('isHoliday') && (
        <div className="flex flex-col gap-2">
          <label htmlFor="hrsHoliday" className="font-medium font-sans">Horas festivas</label>
          <input type="number" {...register('hrsHoliday', {
            required: {
              value: true,
              message: 'Se necesitan las horas festivas'
            },valueAsNumber: true,
            max: {
              value: 24,
              message: 'Debe ser menor de 24 horas'
            },
            min: {
              value: 0,
              message: 'Solo horas mayores a 0'
            },
            pattern: {
              value: /^(0?[0-9]|1[0-2])$/, 
              message: 'Ingrese un número válido del 0 al 12'
            }})} 
            defaultValue={0} className="border-[1px] rounded-lg p-[2px] border-gray-400" />
          {errors.hrsHoliday && <span className="text-red-600">{errors.hrsHoliday.message}</span>}
        </div>
      )}
  <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button>
  <div className='flex flex-col gap-2'>
        <div className=' flex gap-2 items-center justify-between'>
            <label htmlFor='isHoliday' className='font-medium font-sans '>Marcar solo si es festivo</label>
            <input type="checkbox" {...register('isHoliday',{
              require:{
                value:true,
                message:'se requieren horas'
              }
              })} defaultChecked='' className="border-[1px] rounded-lg p-[2px] border-gray-400"/>
        </div>
  </div>
</form>
  )
}

export default FormHour
