

import img from '../../media/img/img.png';

const SeeTotalHours = ({item}) => {

  return (
    <section className="flex flex-col gap-2">
      <article className="flex justify-center">
        <img className='self-center w-[100px] rounded-full h-[100px]' src={img} alt={`${item.employee.profile.name}`} />
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Nombre:</h2>
        <span className="font-sans font-normal">{item.employee.profile.name}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Identificacion:</h2>
        <span className="font-sans font-normal">{item.employee.profile.cc}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Festivo:</h2>
        <span className="font-sans font-normal">{item.isHoliday?'Si':'No'}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas:</h2>
        <span className="font-sans font-normal">{item.dayHour.hours}:{item.dayHour.minutes}</span>
      </article>
    </section>
  )
}

export default SeeTotalHours