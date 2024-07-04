import {NavLink} from 'react-router-dom'
import { GiAvocado } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";
import { LiaSnowflakeSolid } from "react-icons/lia";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

export const Menu = () => {
  return (
    <div className='flex flex-col'>
      <div className='border-b-[1px] m-4 ml-0 mr-0 p-1 flex items-center gap-3' >
          <GiAvocado className='ml-3 h-6 w-6 text-green-600 text-2x1  '/>
        <div>
          <span className=' text-green-500 text-xl'>Fruty</span><span className='text-xl text-orange-300'>Green</span>
        </div>

      </div>
        <nav className='border-b-[1px]'>
            <ul className=' mt-4 flex flex-col '>
              <div className=''>
                <div className=' m-4 ml-6 mb-1 flex gap-3 items-center hover:text-white'>
                  <FaWarehouse className='text-[20px] text-gray-400  '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white sm:w-1' to='/home'>Almacén</NavLink>
                </div>
              </div>
              <li className=' m-4 ml-6 mb-1 mt-2 flex gap-3 items-center '>
                  <LiaSnowflakeSolid className='text-[20px] text-gray-400  '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white sm:w-1' to='/employee'>Fríos</NavLink>
              </li>
              <li className=' m-4 ml-6 mb-1 mt-2 flex gap-3 items-center '>
                  <FaBoxes className='text-[20px] text-gray-400 hover:text-white '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white w-1 sm:w-1' to='/home'>Paletizado</NavLink>
              </li>
              <li className=' m-4 ml-6 mb-1 mt-2 flex gap-3 items-center '>
                  <LiaSnowflakeSolid className='text-[20px] text-gray-400 hover:text-white '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white w-1 sm:w-1' to='/home'>administración</NavLink>
              </li>
              <li className=' m-4 ml-6 mb-1 mt-2 flex gap-3 items-center '>
                  <GiCardboardBoxClosed  className='text-[20px] text-gray-400 hover:text-white '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white w-1 sm:w-1' to='/home'>Empaque</NavLink>
              </li>
              <li className=' m-4 ml-6 mb-1 mt-2 flex gap-3 items-center '>
                  <CiSettings className='text-[20px] text-gray-400 hover:text-white '/>
                  <NavLink className='text-gray-400 text-[15px]
                   hover:text-white w-1 sm:w-1' to='/home'>Máquina</NavLink>
              </li>
            </ul>
        </nav>
        <div className='hover:text-white'>
          <h1>hola</h1>
        </div>
    </div>
  )
}
