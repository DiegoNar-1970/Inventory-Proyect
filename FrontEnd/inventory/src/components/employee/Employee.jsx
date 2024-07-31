

// import { FaHelmetSafety } from "react-icons/fa6";
import Table from "../smallComponents/Table.jsx";
import { useParams } from "react-router-dom";
import  {fetchData} from '../../helpers/fetchData.js'
import { useEffect,useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import CreateEmployee from "./CreateEmployee.jsx";


const apiData=fetchData('http://localhost:3000/employee');
const Employee = () => {

  let {area}=useParams();
  const data= apiData.read();
  const [areaFilter,setAreaFilter]=useState();
  const [nameFilter,setNameFilter]=useState();
  const [see,setSee]=useState(false);

  useEffect(()=>{
    let dataFilter=data.filter(employee=>employee.area===area);
    setAreaFilter(dataFilter);
  },[area,data])
  

  const searchFilter=({target})=>{
    target.value 
    ? setNameFilter(areaFilter.filter(employee=>employee.profile.name.toLowerCase().includes(target.value.toLowerCase())))
    :setNameFilter(areaFilter);
  }


  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-between bg-fondo-menu rounded-lg p-2 box-border  ">
     
       <div className="flex gap-2 items-center  bg-gray-500 rounded-2xl ">
          <input onChange={searchFilter} className="rounded-2xl outline-none  p-[6px]
          rounded-r-none text-black" 
          placeholder="nombre" type="search" />
            <IoSearch className="text-[30px]"/>
        </div>

        <div className="flex gap-2 items-center">
          <IoPersonAddOutline className="text-[30px] text-green-500" />
          <button onClick={()=>{setSee(!see)}}>agregar persona</button>
        </div>

      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
          <Table data={nameFilter ? nameFilter : areaFilter}/>
      </article>
      {see ? 
           <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-start ">
            <div className=" m-auto p-auto bg-gray-200  p-4 rounded-lg flex flex-col  text-black min-w-[400px] max-w-[600px] ">
              <div className='self-end text-[30px]'>
                <button onClick={()=>setSee(!see)}><IoCloseOutline /></button>
              </div>
              <div>
                  <CreateEmployee/>
              </div>
              <div className='w-[100%] mt-[10px]'>
                <button onClick={()=>setSee(!see)} className="mt-2 w-[100%] bg-red-500 text-white p-2 rounded">Cerrar</button>
              </div>
            </div>
           </div>
          :''}
    </div>
  )
}
export default Employee
