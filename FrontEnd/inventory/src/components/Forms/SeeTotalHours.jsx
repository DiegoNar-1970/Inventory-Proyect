

import img from '../../media/img/img.png';

const SeeTotalHours = ({item}) => {
  const {dataResult}= item;
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
        <h2 className="font-sans font-medium">Identificacion:</h2>
        <span className="font-sans font-normal">{dataResult.employee.profile.cc}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Festivo:</h2>
        <span className="font-sans font-normal">{dataResult.isHoliday?'Si':'No'}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Tiempo:</h2>
        <span className="font-sans font-normal">{dataResult.dayHour.hours}:{dataResult.dayHour.minutes}</span>
      </article>
    </section>
  )
}

export default SeeTotalHours