import { formatedDate } from "../../helpers/formateDate"
import img from '../../media/img/img.png'

const FormSeeHours = ({result:{dataResult}}) => {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <img className='self-center w-[100px] rounded-full h-[100px]' src={img} alt={`${dataResult.employee.profile.name}`} />
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Nombre:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.name}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Apellido:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.lastName}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Identificacion:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.cc}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Area:</h2>
        <span className="font-sans font-normal">{dataResult.employee.area}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Fecha:</h2>
        <span className="font-sans font-normal">{formatedDate(dataResult.date)}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas:</h2>
        <span className="font-sans font-normal">{dataResult.dayHour}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas Festivas:</h2>
        <span className="font-sans font-normal">{dataResult.holiday.hrsHoliday}</span>
      </div>
      <div className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Semana:</h2>
        <span className="font-sans font-normal">{dataResult.week}</span>
      </div>
    </div>
  )
}

export default FormSeeHours