import {NavLink} from 'react-router-dom'
import { GiAvocado } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";
import { LiaSnowflakeSolid } from "react-icons/lia";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import img from '../../media/img/img.png'
import { Area } from './Area.jsx';

export const Menu = () => {
  return (
    <div className='flex flex-col flex-1 rounded-lg p-2'>
          <div className='flex items-center p-2 bg-[#1b1b1b] rounded-[1em]'>
            <span className=' mb-2 text-green-500 text-xl'>Fruty</span><span className='text-xl mb-2 text-orange-300'>Green</span>
            <GiAvocado className=' mb-2 ml-4 text-[1.5em] text-green-600 text-2x1  '/>
            
          </div>
          
          <div className='text-text-menu  text-[10px]p-1 m-1 mt-2'>
              <span className=''>Áreas de trabajo</span>
          </div>
          <nav className='flex-1 mt-2 bg-fondo-menu  rounded-[1em] p-2 text-text-menu '>
            <ul className='flex flex-col p-1 gap-5'>
              <li>
                <Area icon={FaWarehouse} href={'home'} area={'Almacén'}/>
              </li>
              <li>
                <Area icon={LiaSnowflakeSolid} href={'employee'} area={'Fríos'}/>
              </li>
              <li>
                <Area icon={FaBoxes} href={'home'} area={'Paletizado'}/>
              </li>
              <li>
                <Area icon={IoIosPeople} href={'home'} area={'administración'}/>
              </li>
              <li>
                <Area icon={GiCardboardBoxClosed} href={'home'} area={'Empaque'}/>
              </li>
              <li>
                <Area icon={CiSettings} href={'home'} area={'Máquina'}/>
              </li>
            </ul>
          </nav>
          <div className='flex text-text-menu hover:text-white transition-all bg-fondo-menu rounded-[1em] 
          p-2 m-1 mt-5 items-center gap-3'>
            <picture className='rounded-[1em] items-center w-[40px] h-[40px] '>
                <img src={img} alt="avatar" className='object-contain rounded-[1em]' />
            </picture>
            <span className='cursor-pointer'>Cerrar Sesion</span>
          </div>
    </div>
  )
}
{/* <div className='border-b-[1px] m-4 ml-0 mr-0 p-1 flex items-center gap-3' >

<div>
</div>

</div>
<nav className='border-b-[1px]'>
  
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
</div> */}