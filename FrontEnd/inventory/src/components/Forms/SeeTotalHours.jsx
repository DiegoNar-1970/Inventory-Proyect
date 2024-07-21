import React from 'react'
import { formatedDate } from '../../helpers/formateDate'
import img from '../../media/img/img.png'

const SeeTotalHours = ({result:{dataResult}}) => {
    console.log('esto llego',dataResult)
  return (
    <section className="flex flex-col gap-2">
      <article className="flex justify-center">
        <img className='self-center w-[100px] rounded-full h-[100px]' src={img} alt={`${dataResult.name}`} />
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Nombre:</h2>
        <span className="font-sans font-normal">{dataResult.name}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Identificacion:</h2>
        <span className="font-sans font-normal">{dataResult.cc}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas festivas:</h2>
        <span className="font-sans font-normal">{dataResult.horasExtras}</span>
      </article>
      <article className=" flex gap-2 text-[18px] ">
        <h2 className="font-sans font-medium">Horas Normales:</h2>
        <span className="font-sans font-normal">{dataResult.horasTotales}</span>
      </article>
    </section>
  )
}

export default SeeTotalHours