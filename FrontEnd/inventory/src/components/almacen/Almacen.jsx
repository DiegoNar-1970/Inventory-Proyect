
import { FaIdCard } from "react-icons/fa";
import LinkParam from "../smallComponents/LinkParam";

const Almacen = () => {
  return (
    <div className="flex flex-wrap flex-1 justify-center gap-4 p-1 ">
      <LinkParam icon={FaIdCard} url={'employee'} area={'almacen'}/>
      <LinkParam icon={FaIdCard} url={'employee'} area={'almacen'}/>
      <LinkParam icon={FaIdCard} url={'employee'} area={'almacen'}/>
    </div>
  )
}
export default Almacen;