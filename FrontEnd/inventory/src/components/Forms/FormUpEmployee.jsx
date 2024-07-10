import {useForm} from 'react-hook-form'

const FormUpEmployee = ({item}) => {
  const {register,handleSubmit}=useForm();
  const onSubmit=handleSubmit((data)=>{
    console.log(data)
  })
  const {dataItem}=item;
  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <label htmlFor="area" className='text-[20px]  font-medium font-sans '>area</label>
        <input type="text" className='border-[1px] rounded-lg p-[2px] border-black 
        text-gray-600'
        {...register('area',)} defaultValue={dataItem.area} />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="position" className='font-medium font-sans '>cargo</label>
        <input type="text" {...register('position')} className="border-[1px] rounded-lg p-[2px] border-black"
        defaultValue={dataItem.area}/>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="shift" className='font-medium font-sans '>turno</label>
        <input type="text" {...register('shift')} className="border-[1px] rounded-lg p-[2px] border-black"
        defaultValue={dataItem.shift}/>

      </div>
      <button className='bg-black text-white rounded-lg self'>enviar</button>
    </form>
  )
}

export default FormUpEmployee