import { formatedDate } from "../../helpers/formateDate"
import img from '../../media/img/img.png'

const FormSeeHours = ({result:{dataResult}}) => {

  return (
    <section className="flex flex-col gap-2">
      <article className="flex justify-center">
        <img className='self-center w-[100px] rounded-full h-[100px]' src={img} alt={`${dataResult.employee.profile.name}`} />
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Nombre:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.name}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Apellido:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.lastName}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Identificacion:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.cc}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Area:</h2>
        <span className="font-sans font-normal">{dataResult.employee.area}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Fecha:</h2>
        <span className="font-sans font-normal">{formatedDate(dataResult.date)}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas:</h2>
        <span className="font-sans font-normal">{dataResult.dayHour}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas Festivas:</h2>
        <span className="font-sans font-normal">{dataResult.holiday.hrsHoliday}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Semana:</h2>
        <span className="font-sans font-normal">{dataResult.week}</span>
      </article>
    </section>
  )
}

export default FormSeeHours