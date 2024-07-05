
import { IoPersonAddOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
// import { FaHelmetSafety } from "react-icons/fa6";
import img from '../../media/img/img.png'
const Employee = () => {
  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
        {/* <div className="flex gap-2 items-center text-center ">
          <FaHelmetSafety className="text-[40px] text-center text-orange-300"/>
          <div className="flex flex-col">
            <h1 className="text-4xl text-green-500">Empleados</h1>
            <span className="text-[14px] font-thin">control de empleados</span>
          </div>
        </div> */}
        <div className="flex gap-2 items-center bg-gray-500 rounded-2xl ">
          <input className="rounded-2xl outline-none  p-[6px]
          rounded-r-none text-black" 
          placeholder="nombre" type="search" />
          <button className=" text-white min-w-[30px] h-full mr-[10px]">
            <IoSearch className="text-[30px]"/>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <IoPersonAddOutline className="text-[30px] text-green-500" />
          <button>agregar persona</button>
        </div>
        <div>
        </div>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
              <h1 className=" ml-1 text-[17px] text-gray-500">Personal</h1>
          <table className="text-left text-[13px] border-collapse text-white rounded-r-lg">
            <thead className="text-white rounded-r-lg ">
              <tr className="" >
                <th className="border-b-[1px] border-gray-500">nombre</th>
                <th className="border-b-[1px] border-gray-500">apellido</th>
                <th className="border-b-[1px] border-gray-500">Cedula</th>
                <th className="border-b-[1px] border-gray-500">area</th>
                <th className="border-b-[1px] border-gray-500">Estado</th>
                <th className="border-b-[1px] border-gray-500">Acciones</th>
              </tr>
            </thead>
              <tr>
                <td className="flex gap-2 items-center">
                  <img className="w-[25px] h-full rounded-[2em]"src={img} alt="" />
                  <span>Diego</span>
                </td>
                 <td className="text-gray-500">narajo</td> 
                <td >100</td> 
                 <td className="text-gray-500">almacen</td> 
                <td>💚activo 🖤</td> 
                <td>
                  <button className="bg-green-500 text-white rounded-[1em] p-[2px]">Actualizar</button>
                </td>
              </tr>
            
          </table>
      </article>

    </div>

  )
}
export default Employee
