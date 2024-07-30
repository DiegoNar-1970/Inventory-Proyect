
import { GiAvocado } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";
import { LiaSnowflakeSolid } from "react-icons/lia";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import img from '../../media/img/img.png'
import Links from '../menu/Links.jsx'
import Logout from '../user/Logout.jsx'

 const Menu = () => {
  return (
    <div className='flex flex-col flex-1 rounded-lg p-2'>
          <div className='flex items-center p-2 bg-[#1b1b1b] rounded-[1em]'>
            <span className=' mb-2 text-green-500 text-xl'>Fruty</span><span className='text-xl mb-2 text-orange-300'>Green</span>
            <GiAvocado className=' mb-2 ml-4 text-[1.5em] text-green-600 text-2x1  '/>
          </div>
          <div className='text-gray-500 text-[10px]p-1 m-1 mt-2'>
              <span >Áreas de trabajo</span>
          </div>
          
          <nav className='flex-1 mt-2 bg-fondo-menu  rounded-[1em] p-2 text-text-menu '>
            <ul className='flex flex-col p-1 gap-5 flex-1 h-[95%] justify-center'>
              <Links icon={FaWarehouse} href={"almacen"} area={"Almacén"}></Links>
              <Links icon={LiaSnowflakeSolid} href={"frios"} area={"Fríos"}></Links>
              <Links icon={FaBoxes} href={"paletizado"} area={"Paletizado"}></Links>
              <Links icon={IoIosPeople} href={"admin"} area={"administración"}></Links>
              <Links icon={GiCardboardBoxClosed} href={"empaque"} area={"Empaque"}></Links>
              <Links icon={CiSettings} href={"maquina"} area={"Máquina"}></Links>
            </ul>
          </nav>
      
          <div className='flex text-text-menu hover:text-white transition-all bg-fondo-menu rounded-[1em] 
          p-2 m-1 mt-5 items-center gap-3'>
            <picture className='rounded-[1em] items-center w-[40px] h-[40px] '>
                <img src={img} alt="avatar" className='object-contain rounded-[1em]' />
            </picture>
            <Logout></Logout>

          </div>
    </div>
  )
}
export default Menu;