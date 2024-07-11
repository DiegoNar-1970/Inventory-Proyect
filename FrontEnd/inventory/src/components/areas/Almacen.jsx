

import { FaIdCard } from "react-icons/fa";
import LinkParam from '../smallComponents/LinkParam'
import { CgAlarm } from "react-icons/cg";
import { CgAirplane } from "react-icons/cg";


const Almacen = () => {
  return (
    <div className="flex flex-wrap flex-1 justify-center gap-4 p-1">
      <LinkParam icon={FaIdCard} url={'employee'} area={'almacen'} linkName={"Empleados"}/>
      <LinkParam icon={CgAlarm} url={'horas'} area={'almacen'} linkName={'Manejo Horas'}/>
      <LinkParam icon={CgAirplane} url={'employee'} area={'almacen'} linkName={'Vacaciones'}/>
    </div>
  )
}
export default Almacen;