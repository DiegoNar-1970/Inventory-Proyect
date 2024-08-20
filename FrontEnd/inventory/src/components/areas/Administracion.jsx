
import { CgAirplane, CgAlarm } from "react-icons/cg";
import { FaIdCard } from "react-icons/fa";
import LinkParam from '../links/LinkParam';
const Administracion = () => {
  return (
    <div className="flex flex-wrap flex-1 justify-center gap-4 p-1">
      <LinkParam icon={FaIdCard} url={'employee'} area={'administracion'} linkName={"Empleados"}/>
      <LinkParam icon={CgAlarm} url={'horas'} area={'administracion'} linkName={'Manejo Horas'}/>
      <LinkParam icon={CgAirplane} url={'vacaciones'} area={'administracion'} linkName={'Vacaciones'}/>
    </div>
  )
}

export default Administracion 