
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const Links = ({icon:Icon, href,area}) => {
    return (
        <div className='flex gap-2 p-1 hover:bg-gray-700 rounded-[1em]'>
            <Suspense fallback={
                <div className='loader'></div>
            }>
                <Icon className='text-[20px] hover:text-white transition-all'/>
                <NavLink className='text-[16px] hover:text-white transition-all' to={`/${href}`}>{area}</NavLink>   
                <Outlet/>
            </Suspense>
        </div>
  )
}

export default Links