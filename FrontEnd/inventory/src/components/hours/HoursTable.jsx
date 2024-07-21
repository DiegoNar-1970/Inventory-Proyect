
import React, { useState } from 'react'
import img from '../../media/img/img.png'
import { IoCloseOutline } from "react-icons/io5";
import FormUpHour from '../Forms/FormUpHour.jsx'
import FormSeeHour from '../Forms/FormSeeHours.jsx'
import { formatedDate } from '../../helpers/formateDate.js';
import SeeTotalHours from '../Forms/SeeTotalHours.jsx';


const HoursTable = ({datos}) => {
  console.log(datos)
  const [see,setSee]=useState({
    component:'',
    isTrue:false,
    dataResult:{}
  });

  // console.log(Object.keys(datos).forEach((key)=>{
    //aqui se usa employee para que sea igual a el objeto especificado con [key]
  //   const employee = datos[key];
  //como es un forEach accede a ese empleado y puede acceder a la informacion
  //   console.log(employee.data.map(result=>{return result.employee.profile.cc}))
  // }))

  return (
    <>
    <h1 className=" ml-1 text-[17px] text-gray-500">Personal</h1>
     <table className="text-left text-[13px] border-collapse text-white rounded-r-lg">
       <thead className="text-white rounded-r-lg ">
         <tr className="" >
           <th className="border-b-[1px] border-gray-500">nombre</th>
           <th className="border-b-[1px] border-gray-500">Cedula</th>
           <th className="border-b-[1px] border-gray-500">Horas</th>
           <th className="border-b-[1px] border-gray-500">Horas Festivas</th>
           <th className="border-b-[1px] border-gray-500">Semana</th>
           <th className="border-b-[1px] border-gray-500">Fecha</th>
           <th className="border-b-[1px] border-gray-500">Acciones</th>
         </tr>
       </thead>
       <tbody>
         {datos && Object.entries(datos).map(([key,info])=> (
          <React.Fragment key={key}>
          {info.data.map((result)=>(
            <tr key={result._id}>
              {console.log('info',info)}
             <td>
              <div className="flex gap-2 results-center box-border mt-1">
               <img className="min-w-[30px] max-w-[30px] h-full rounded-[2em] overflow-hidden text-ellipsis"src={img} alt="" />
               <span>{result.employee.profile.name}</span>
             </div>
            </td>
            <td className="text-gray-500">{result.employee.profile.cc}</td> 
            <td >{result.dayHour}</td> 
            <td >{result.holiday.hrsHoliday}</td> 
            <td >{result.week}</td> 
            <td className="text-gray-500">{formatedDate(result.date)}</td> 
           <td >
           <button onClick={()=>{setSee({
                 component:'update',
                 isTrue:true,
                 dataResult:result
               })}}
           className="ml-[5px] bg-[##00800017] text-green-500 rounded-[1em] 
             border-[1px] border-green-500 hover:text-white hover:bg-[#52d9669b] p-[4px]">Actualizar</button>
             <button onClick={()=>{
               setSee({
                 component:'info',
                 isTrue:true,
                 dataResult:result
               })
             }}  className="ml-[5px] bg-[##00800017] text-white rounded-[1em] 
             border-[1px] border-white hover:text-[#52d9669b] hover:border-[#52d9669b] p-[4px]">Informacion</button>
             <button onClick={()=>{
               setSee({
                 component:'allHours',
                 isTrue:true,
                 dataResult:info
               })
             }}  className="ml-[5px] bg-[##00800017] text-white rounded-[1em] 
             border-[1px] border-white hover:text-[#52d9669b] hover:border-[#52d9669b] p-[4px]">Total Horas</button>
             <button onClick={()=>{
               setSee({
                 component:'delete',
                 isTrue:true,
                 dataResult:result
               })
             }} className=" bg-[#ff969601] border-[1px] border-[#952c2c98] text-[#952c2c] hover:text-white
              hover:bg-[#952c2c98] ml-[5px] rounded-[1em] p-[4px]">Eliminar</button>
              
           </td>
           </tr>
          ))}
          </React.Fragment>
        ))}
       </tbody>
     </table>
     {see.component === 'update' && see.isTrue===true && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex results-center justify-start ">
       <div className=" m-auto p-auto bg-white p-4 rounded-lg flex flex-col gap-2 text-black min-w-[300px]">
         <div className='self-end text-[30px]'>
           <button onClick={()=>setSee(!see)}><IoCloseOutline /></button>
         </div>
         <div>
          {console.log('se manda',see)}
           <FormUpHour result={see}></FormUpHour>
         </div>
         <div className='self-center w-[100%]' >
           <button onClick={()=>setSee(!see)} className="mt-1 bg-red-500 w-[100%] text-white p-2 rounded">Cerrar</button>
         </div>
       </div>
      </div>
     )}
     {see.component === 'info' && see.isTrue===true && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex results-center justify-start ">
       <div className=" m-auto p-auto bg-white p-4 rounded-lg flex flex-col  text-black min-w-[300px] max-w-[500px] ">
         <div className='self-end text-[30px]'>
           <button onClick={()=>setSee(!see)}><IoCloseOutline /></button>
         </div>
         <div>
             <FormSeeHour result={see}></FormSeeHour>
         </div>
         <div className='w-[100%] mt-[10px]'>
           <button onClick={()=>setSee(!see)} className="mt-2 w-[100%] bg-red-500 text-white p-2 rounded">Cerrar</button>
         </div>
       </div>
      </div>
     )}
     
     {see.component === 'allHours' && see.isTrue===true && (
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex results-center justify-start ">
       <section className=" m-auto p-auto bg-white p-4 rounded-lg flex flex-col  text-black min-w-[300px] max-w-[500px] ">
         <article className='self-end text-[30px]'>
           <button onClick={()=>setSee(!see)}><IoCloseOutline /></button>
         </article>
         <article>
                  <SeeTotalHours result={see}/>
         </article>
         <article className='w-[100%] mt-[10px]'>
           <button onClick={()=>setSee(!see)} className="mt-2 w-[100%] bg-red-500 text-white p-2 rounded">Cerrar</button>
         </article>
       </section>
      </div>
     )}
</>
)
}

export default HoursTable
