
import {NavLink} from 'react-router-dom'
export const Area = ({icon:Icon,href,area}) => {
  return (
    <div className='flex gap-2 p-1 hover:bg-gray-700 rounded-[1em]'>
        <Icon className='text-[20px] hover:text-white transition-all'/>
        <NavLink className='text-[15px] hover:text-white transition-all' to={`/${href}`} >{`${area}`}</NavLink>
    </div>
  )
}
