import {useForm} from 'react-hook-form'

const FormUpHour = ({result}) => {
 const {dataResult}=result
 console.log(dataResult)

  const {register,handleSubmit,formState:{errors},watch}=useForm({
    defaultValues: {
      isHoliday: dataResult.holiday.isHoliday,
      hrsHoliday: dataResult.holiday.hrsHoliday,
      dayHour:dataResult.dayHour,
    }});

    const onSubmit = handleSubmit((data) => {

      const formattedData = {
        ...data,
        holiday: {
          isHoliday:data.isHoliday || false,
          hrsHoliday:data.hrsHoliday || 0
        } 
      };
      //se accede a los datos isHoliDay de data no de holiday
      delete formattedData.isHoliday;
      delete formattedData.hrsHoliday;
      console.log('Datos enviados:', formattedData);
    });


  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="cc" className='font-medium font-sans '>Identificacion</label>
        <input type="text"
        defaultValue={dataResult.employee.profile.cc}
        readOnly
        className="border-[1px] rounded-lg p-[2px]
        border-gray-400" />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="cc" className='font-medium font-sans '>Nombre</label>
        <input type="text"
        defaultValue={dataResult.employee.profile.name}
        readOnly
        className="border-[1px] rounded-lg p-[2px]
        border-gray-400" />
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
            defaultValue={dataResult.holiday.hrsHoliday} className="border-[1px] rounded-lg p-[2px] border-gray-400" />
          {errors.hrsHoliday && <span className="text-red-600">{errors.hrsHoliday.message}</span>}
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <label htmlFor="week" className='font-medium font-sans '>Semana</label>
        <input type="text" {...register('week',{
          required:{
            value:true,
            message:'Se necesita la Semana'
        }})
        } className="border-[1px] rounded-lg p-[2px] 
        border-gray-400"
        defaultValue={dataResult.week}/>
        {errors.position && <span className='text-red-600'>{errors.position.message}</span>}
      </div>

      <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button>

      <div className=' flex gap-2 items-center justify-between'>
            <label htmlFor='isHoliday' className='font-medium font-sans '>Hoy es festivo?</label>
            <input type="checkbox" {...register('isHoliday',{
              require:{
                value:true,
                message:'se requieren horas'
              }
              })} defaultChecked={dataResult.holiday.isHoliday} className="border-[1px] rounded-lg p-[2px] border-gray-400"/>
        </div>
    </form>
  )
}

export default FormUpHour