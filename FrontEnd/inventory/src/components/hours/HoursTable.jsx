
import { useState } from 'react';
import { formatedDate } from '../../helpers/formateDate.js';
import img from '../../media/img/img.png';
import FormSeeHour from '../hours/FormSeeHours.jsx';
import FormUpHour from '../hours/FormUpHour.jsx';
import SeeTotalHours from '../hours/SeeTotalHours.jsx';
import { Popap } from '../smallComponents/Popap.jsx';


const HoursTable = ({datos}) => {

  const [see,setSee]=useState({
    component:'',
    isTrue:false,
    dataResult:{}
  });
  const changeSee=()=>{
    setSee({component:'',isTrue:false,dataItem:{}});
  }
  return (
    <>
    <h1 className=" ml-1 text-[17px] text-gray-500">Horas</h1>
     <table className="text-left text-[13px] border-collapse text-white rounded-r-lg">
       <thead className="text-white rounded-r-lg ">
         <tr className="" >
           <th className="border-b-[1px] border-gray-500">nombre</th>
           <th className="border-b-[1px] border-gray-500">Cedula</th>
           <th className="border-b-[1px] border-gray-500">Horas</th>
           <th className="border-b-[1px] border-gray-500">Festivo</th>
           <th className="border-b-[1px] border-gray-500">Semana</th>
           <th className="border-b-[1px] border-gray-500">Fecha</th>
           <th className="border-b-[1px] border-gray-500">Acciones</th>
         </tr>
       </thead>
       <tbody>
         {datos && datos.map((info)=> (
            <tr key={info._id}>
             <td>
              <div className="flex gap-2 results-center box-border mt-1">
               <img className="min-w-[30px] max-w-[30px] h-full rounded-[2em] overflow-hidden text-ellipsis"src={img} alt="" />
               <span>{info.employee.profile.name}</span>
             </div>
            </td>
            <td className="text-gray-500">{info.employee.profile.cc}</td> 
            <td >{info.dayHour.hours}</td> 
            <td >
              {info.isHoliday ? 'Si':'No'}
            </td> 
            <td >{info.week}</td> 
            <td className="text-gray-500">{formatedDate(info.creationDate)}</td> 
           <td >
           <button onClick={()=>{setSee({
                 component:'update',
                 isTrue:true,
                 dataResult:info
               })}}
           className="ml-[5px] bg-[##00800017] text-green-500 rounded-[1em] 
             border-[1px] border-green-500 hover:text-white hover:bg-[#52d9669b] p-[4px]">Actualizar</button>
             <button onClick={()=>{
               setSee({
                 component:'info',
                 isTrue:true,
                 dataResult:info
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
                 dataResult:info
               })
             }} className=" bg-[#ff969601] border-[1px] border-[#952c2c98] text-[#952c2c] hover:text-white
              hover:bg-[#952c2c98] ml-[5px] rounded-[1em] p-[4px]">Eliminar</button>
              
           </td>
           </tr>
          
        ))}
       </tbody>
     </table>
     {see.component === 'update' && see.isTrue===true && (
      <Popap
        see={see.dataResult}
        changeSee={changeSee}
        component={FormUpHour} 
      />      
     )}
     {see.component === 'info' && see.isTrue===true && (
      <Popap
      see={see.dataResult}
      changeSee={changeSee}
      component={FormSeeHour} 
      />        
     )}
     {see.component === 'allHours' && see.isTrue===true && (
      <Popap
      see={see.dataResult}
      changeSee={changeSee}
      component={SeeTotalHours} 
      />
                  
         
     )}
</>
)
}

export default HoursTable
