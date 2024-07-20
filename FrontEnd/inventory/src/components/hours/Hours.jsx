
import { useParams } from "react-router-dom";
import Search from "../smallComponents/Search.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import  UseBodyFetch from '../../helpers/UseBodyFetch.jsx'
import HoursTable from "./HoursTable.jsx";
// const condiciones={
  //   startDate:"2024/01/01",
  //   endDate:"2024/01/02",
  //   startWeek:1,
  //   endWeek:1
  // }
  const Hours = () => {
    const {register,handleSubmit,formState:{errors},watch}=useForm();
    const [send,setSend]=useState({});
    console.log(send)
    let {area}=useParams();

    
    const onSubmit = handleSubmit((condiciones) => {
      console.log('Datos enviados:', condiciones);

      const {data,loading}=UseBodyFetch(`http://localhost:3000/workHour/?area=${area}`,area,condiciones);
      const datos=data

      setSend({datos,loading})

    });

  return (
    <section className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
        {send && 
          <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
            <Search/>
          </article>
         }
      
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-3 items-center justify-center">
              <form action="" className='p-[20px] flex flex-col relative  
               w-[50%] min-w-[305px] max-w-[354px] rounded-xl outline outline-[2px] outline-[#393a3c] ' onSubmit={onSubmit}>
                <h3 className="text-[25px] font-sans font-medium mb-[1px] ">Filtrar por fechas</h3>
                <h3 className="text-[15px] font-sans font-ligth mb-[30px] text-[#6b7280]">
                  Selecciona el rango de fechas y semanas para consultar.
                </h3>
                <div className="flex gap-5 flex-wrap relative">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="startWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Semana inicial</label>
                    <input className=" rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c]
                    focus:outline-none border-none"
                      type="number" {...register('startWeek', {
                        required: {
                        value: true,
                        message: 'Se necesita una semana'
                        },
                        max: {
                          value: 60,
                          message: 'Debe ser menor de 60'
                        },
                        min: {
                          value: 0,
                          message: 'minimo 1'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startWeek.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="endWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Semana Final</label>
                    <input className="rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c]
                    focus:outline-none border-none"
                      type="number" {...register('endWeek', {
                        required: {
                        value: true,
                        message: 'Se necesita una semana'
                        },
                        max: {
                          value: 60,
                          message: 'Debe ser menor de 60'
                        },
                        min: {
                          value: 0,
                          message: 'minimo 1'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.endWeek.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="startDate" className="font-light font-sans text-[#6b7280] text-[17px]">Fecha inicial</label>
                    <input placeholder={'semana'} className=" max-w-[145px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none "
                      type="date" {...register('startDate', {
                        required: {
                        value: true,
                        message: 'Se necesita una fecha'
                        }
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startDate.message}</span>}
                  </div><div className="flex flex-col gap-2 ">
                    <label htmlFor="endDate" className="font-light font-sans text-[#6b7280] text-[17px]">Fecha final</label>
                    <input placeholder={'semana'} className="max-w-[145px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none"
                      type="date" {...register('endDate', {
                        required: {
                        value: true,
                        message: 'Se necesita una fecha'
                        }
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.endDate.message}</span>}
                  </div>
                  
                </div>
                <button className="flex-1 bg-[#22c55e] text-black p-1 rounded-[.80em] mt-[50px]">Consultar</button>
              </form>
           {/* {send?.loading ? <span>Loading...</span> :
            <HoursTable datos={send.datos} />} */}
      </article>
     
    </section>
  )
}

export default Hours