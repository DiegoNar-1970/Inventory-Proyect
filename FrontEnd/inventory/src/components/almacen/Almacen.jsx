
import { FaIdCard } from "react-icons/fa";
import { Link} from "react-router-dom";

const Almacen = () => {
  return (
    <div className="flex flex-wrap flex-1 justify-center gap-4 p-1 ">
      <div className="min-w-[100px] w-[450px] min-h-[50px] h-[50px] 
      bg-slate-100 relative rounded-[1em] text-[1.1em] hover:bg-gray-500
      text-black shadow-md shadow-fondo-menu transition-all">
        <Link to={`/employee`} className="h-full w-full flex justify-center items-center gap-4">
          <FaIdCard  className="text-[30px]"/>
          <span>Registro empleados</span>
        </Link>
      </div>
      <div className="min-w-[100px] w-[450px] min-h-[50px] h-[50px] 
      bg-slate-100 relative rounded-[1em] text-[1.1em] hover:bg-gray-500
      text-black shadow-md shadow-fondo-menu transition-all">
        <button className="h-full w-full flex justify-center items-center gap-4">
          <FaIdCard  className="text-[30px]"/>
          <span>Registro empleados</span>
        </button>
      </div>
      <div className="min-w-[100px] w-[450px] min-h-[50px] h-[50px] 
      bg-slate-100 relative rounded-[1em] text-[1.1em] hover:bg-gray-500
      text-black shadow-md shadow-fondo-menu transition-all">
        <button className="h-full w-full flex justify-center items-center gap-4">
          <FaIdCard  className="text-[30px]"/>
          <span>Registro empleados</span>
        </button>
      </div>
      <div className="min-w-[100px] w-[450px] min-h-[50px] h-[50px] 
      bg-slate-100 relative rounded-[1em] text-[1.1em] hover:bg-gray-500
      text-black shadow-md shadow-fondo-menu transition-all">
        <button className="h-full w-full flex justify-center items-center gap-4">
          <FaIdCard  className="text-[30px]"/>
          <span>Registro empleados</span>
        </button>
      </div>
    </div>
  )
}
export default Almacen;