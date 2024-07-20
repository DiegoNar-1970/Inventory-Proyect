
import { useParams } from "react-router-dom";
import Search from "../smallComponents/Search.jsx";
import { useForm } from "react-hook-form";
// import  {UseBodyFetch} from '../../helpers/UseFetch.js'
// import HoursTable from "./HoursTable.jsx";
// const condiciones={
  //   startDate:"2024/01/01",
  //   endDate:"2024/01/02",
  //   startWeek:1,
  //   endWeek:1
  // }
  const Hours = () => {
    const {register,handleSubmit,formState:{errors},watch}=useForm();
    const onSubmit = handleSubmit((data) => {
      console.log('Datos enviados:', data);
    });

  // let {area}=useParams();
  // const {data,loading}=UseBodyFetch(`http://localhost:3000/workHour/?area=${area}`,area,condiciones);
  // const datos=data
  return (
    <section className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
          <Search/>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-3 items-center">
              <form action="" className='p-[10px] flex flex-col relative 
               w-[50%] min-w-[405px] max-w-[405px] rounded-xl  bg-[#202124]' onSubmit={onSubmit}>
                <h3 className="text-[25px] font-sans font-medium mb-[1px] ">Filtrar por fechas</h3>
                <h3 className="text-[15px] font-sans font-ligth mb-[30px] text-[#6b7280]">
                  Selecciona el rango de fechas y semanas que deseas ver.
                </h3>
                <div className="flex gap-5 flex-wrap relative">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="startWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Fecha inicial</label>
                    <input className="min-w-[177px] rounded-lg p-[2px] border-gray-400
                     text-black border-t-[0px] bg-slate-200
                    focus:outline-none border-none"
                      type="date" {...register('startWeek', {
                        required: {
                        value: true,
                        message: 'Se necesita una semana'
                        },
                        max: {
                          value: 60,
                          message: 'Debe ser menor de 60'
                        },
                        min: {
                          value: 1,
                          message: 'minimo 1'
                        },
                        pattern: {
                          value: /^(0?[0-9]|1[0-2])$/, 
                          message: 'Ingrese una semana válido del 1 al 60'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startWeek.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="startWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Fecha Final</label>
                    <input className="min-w-[177px] rounded-lg p-[2px] border-gray-400
                     text-black border-t-[0px] bg-slate-200
                    focus:outline-none border-none"
                      type="date" {...register('startWeek', {
                        required: {
                        value: true,
                        message: 'Se necesita una semana'
                        },
                        max: {
                          value: 60,
                          message: 'Debe ser menor de 60'
                        },
                        min: {
                          value: 1,
                          message: 'minimo 1'
                        },
                        pattern: {
                          value: /^(0?[0-9]|1[0-2])$/, 
                          message: 'Ingrese una semana válido del 1 al 60'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startWeek.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="startWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Semana inicial</label>
                    <input className=" rounded-lg p-[2px] border-gray-400
                     text-black border-t-[0px] bg-slate-200
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
                          value: 1,
                          message: 'minimo 1'
                        },
                        pattern: {
                          value: /^(0?[0-9]|1[0-2])$/, 
                          message: 'Ingrese una semana válido del 1 al 60'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startWeek.message}</span>}
                  </div><div className="flex flex-col gap-2 ">
                    <label htmlFor="startWeek" className="font-light font-sans text-[#6b7280] text-[17px]">Semana final</label>
                    <input className=" rounded-lg p-[2px] border-gray-400
                     text-black border-t-[0px] bg-slate-200
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
                          value: 1,
                          message: 'minimo 1'
                        },
                        pattern: {
                          value: /^(0?[0-9]|1[0-2])$/, 
                          message: 'Ingrese una semana válido del 1 al 60'
                        },valueAsNumber: true
                    })} defaultValue={0}  />
                    {errors.dayHour && <span className="text-red-600">{errors.startWeek.message}</span>}
                  </div>
                  
                </div>
                <button className="flex-1 bg-green-900 p-1 rounded-[.80em] mt-[40px]">Consultar</button>
              </form>
           {/* {loading ? <span>Loading...</span> :
            <HoursTable datos={datos} />} */}
      </article>
    </section>
  )
}

export default Hours