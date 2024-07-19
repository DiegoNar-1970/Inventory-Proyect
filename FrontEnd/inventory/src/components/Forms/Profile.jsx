import { formatedDate } from '../../helpers/formateDate';
import img from '../../media/img/img.png'

const Profile = ({item}) => {
  const { dataItem } = item;
  console.log(dataItem)
  return (
    <div className="flex flex-col gap-2">
<div className="flex justify-center">
  <img className='self-center w-[100px] rounded-full h-[100px]' src={img} alt={`${dataItem.profile.name}`} />
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Nombre:</h2>
  <span className="font-sans font-normal">{dataItem.profile.name}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Apellido:</h2>
  <span className="font-sans font-normal">{dataItem.profile.lastName}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Identificacion:</h2>
  <span className="font-sans font-normal">{dataItem.profile.cc}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Correo:</h2>
  <span className="font-sans font-normal">{dataItem.profile.email}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Telefono:</h2>
  <span className="font-sans font-normal">{dataItem.profile.phone}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">EPS:</h2>
  <span className="font-sans font-normal">{dataItem.profile.eps}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Area:</h2>
  <span className="font-sans font-normal">{dataItem.area}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Fecha de Admision:</h2>
  <span className="font-sans font-normal">{formatedDate(dataItem.admissionDate)}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Cargo:</h2>
  <span className="font-sans font-normal">{dataItem.position}</span>
</div>
<div className=" flex gap-2 text-[18px] ">
  <h2 className="font-sans font-medium">Turno:</h2>
  <span className="font-sans font-normal">{dataItem.shift}</span>
</div>
</div>
  
  )
}

export default Profile

{/* </div>
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
    <div className='flex flex-col gap-2'>
      <label htmlFor="cc" className='text-[20px]  font-medium font-sans '>Cedula</label>
      <input type="number" className='border-[1px] text-black rounded-lg p-[2px] border-gray-400'
        {...register('cc',{required:{
          value:true,
          message:'Se necesita un cedula'
        },minLength:{
          value:9,
          message:'debe tener al menos 9 caracteres'
        }
        })} defaultValue={dataItem.profile.cc} />
      {errors.cc && <span className='text-red-600'>{errors.cc.message}</span>}
    </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="name" className='font-medium font-sans '>Nombre</label>
    <input type="text" {...register('name',{
      required:{
        value:true,
        message:'Se necesita un nombre'
    }})
    } className="border-[1px] rounded-lg p-[2px] 
    border-gray-400"
    defaultValue={dataItem.profile.name}/>
    {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
  </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="lastName" className='font-medium font-sans '>Apellido</label>
    <input type="text" {...register('lastName',{required:{
      value:true,
      message:'Se necesita una fecha de nacimiento'
    },

    validate:(value)=>{
      const birtDate=new Date(value);
      const newDate=new Date();
      let years=newDate.getFullYear()-birtDate.getFullYear();
        years > 18 ? true : 'menor de edad'
    }})} 

    className="border-[1px] rounded-lg p-[2px]
    border-gray-400"  defaultValue={dataItem.profile.lastName}/>
    {errors.shift && <span className='text-red-600'>{errors.shift.message}</span>} 
  
  </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="sex" className='font-medium font-sans '>Sexo</label>
    <input type="text" {...register('sex',{
      required:{
        value:true,
        message:'Se necesita un sexo'
    }})
    } className="border-[1px] rounded-lg p-[2px] 
    border-gray-400"
    defaultValue={dataItem.profile.sex}/>
    {errors.sex && <span className='text-red-600'>{errors.sex.message}</span>}
  </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="phone" className='font-medium font-sans '>Telefono</label>
    <input type="number" {...register('phone',{
      required:{
        value:true,
        message:'Se necesita un telefono'
    }})
    } className="border-[1px] rounded-lg p-[2px] 
    border-gray-400"
    defaultValue={dataItem.profile.phone}/>
    {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
  </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="email" className='font-medium font-sans '>Correo</label>
    <input type="email" {...register('email',{
      
      required:{
        value:true,
        message:'Se necesita un email'
    },

    pattern:{
      value:/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
      message:'email invalido'
    }})

    } className="border-[1px] rounded-lg p-[2px] 
    border-gray-400"
    defaultValue={dataItem.profile.email}/>
    {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
  
  </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor="eps" className='font-medium font-sans '>Eps</label>
    <input type="text" {...register('eps',{
      required:{
        value:true,
        message:'Se necesita una eps'
    }})
    } className="border-[1px] rounded-lg p-[2px] 
    border-gray-400"
    defaultValue={dataItem.profile.eps}/>
    {errors.eps && <span className='text-red-600'>{errors.eps.message}</span>}
  </div>
  {/* <button className='bg-black text-white rounded-lg self p-1 mt-2'>Enviar</button> */}
// </form> */}