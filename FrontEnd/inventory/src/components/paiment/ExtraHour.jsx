import React from 'react'
import { newFormatHour } from '../../helpers/formatsHours'

const ExtraHour = ({extraHrs}) => {
  return (
    <div className='flex justify-between gap-6'>
        <span>Hora Extra {newFormatHour(extraHrs.typeHour)}</span>
        <div className='flex justify-between min-w-[260px] '>
            <span>{extraHrs.totalHours.toFixed(1)}</span>
            <span>{extraHrs.paiForHourComission.toFixed(1)}</span>
            <span>{extraHrs.paiOfHours.toFixed(1)}</span>
            <span>0</span>
        </div>
    </div>
  )
}

export default ExtraHour
