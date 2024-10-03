import React from 'react'
import { newFormatShift } from '../../helpers/formatsHours'

const HrsComission = ({info}) => {
  return (
    <div className='flex justify-between '>
      <span>Recargo {newFormatShift(info.type)}</span>   
      <div className='flex justify-between min-w-[260px] items-end'>
        <span>{info.hrs}</span>
        <span>{(info.pai).toFixed(2)}</span>
        <span>{info.hrs}</span>
        <span>0</span>
      </div>
    </div>
  )
}

export default HrsComission
