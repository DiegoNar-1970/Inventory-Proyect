import { BsCalendar2Date, BsCalendar2Week, BsCalendarDate } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { formatedDate, formatedTime } from "../../helpers/formateDate";
import { newFormatShift } from "../../helpers/formatsHours";

const FormSeeHours = ({item}) => {  
  console.log(item);
  return (
    <section className="flex flex-col gap-2 p-2 ">
      <article className=" flex gap-1  flex-col mb-4">
        <h2 className="   font-sans font-medium text-[25px]">Detalles del turno</h2>
        <span className=" font-normal text-[15px] text-gray-400 ">Informacion sobre el turno del empleado</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center ">
        <BsCalendarDate className="text-[22px] font-medium"/>
        <h2 className=" font-sans font-medium ">Fecha Registro:</h2>
        <span className=" font-normal  ">{formatedDate(item.creationDate)}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center">
        <BsCalendar2Week className="text-[22px]"/>
        <h2 className=" font-sans font-medium ">Hora de entrada:</h2>
        <span className=" font-normal">{formatedTime(item.checkTime)}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center">
      <BsCalendar2Date className="text-[22px]"/>
        <h2 className=" font-sans font-medium ">Fecha de salida:</h2>
        <span className=" font-normal">{formatedTime(item.leaveWork)}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center ">
      <MdOutlineEmojiFoodBeverage className="text-[27px]"/> 
        <h2 className=" font-sans font-medium ">Desayuno:</h2>
        <span className=" font-normal">{item.breakfast ? 'Si' : 'No'}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center">
        <IoFastFoodOutline className="text-[22px]"/>
        <h2 className=" font-sans font-medium ">Almuerzo:</h2>
        <span className=" font-normal">{item.lunch ? 'Si':'No'}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center">
      <FaHelmetSafety className="text-[22px] "/>
        <h2 className=" font-sans font-medium ">Turno:</h2>
        <span className=" font-normal">{newFormatShift(item.typeHour)}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center ">
        <LiaCalendarWeekSolid className="text-[25px]"/>
        <h2 className=" font-sans font-medium ">Semana:</h2>
        <span className=" font-normal">{item.week}</span>
      </article>
      <article className=" flex gap-4 text-[18px] items-center">
      <FaRegNewspaper className="text-[22px]"/>
        <h2 className=" font-sans font-medium ">Novedades Registradas:</h2>
        <span className=" font-normal">{item.news !=null ? 'Si' : 'No' }</span>
      </article>
    </section>
  )
}

export default FormSeeHours