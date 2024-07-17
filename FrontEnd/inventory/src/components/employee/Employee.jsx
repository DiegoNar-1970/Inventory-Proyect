

// import { FaHelmetSafety } from "react-icons/fa6";
import Table from "../smallComponents/Table.jsx";
import { useParams } from "react-router-dom";
import  {fetchData} from '../../helpers/fetchData.js'
import { useEffect,useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


const apiData=fetchData('http://localhost:3000/employee');
const Employee = () => {

  let {area}=useParams();
  const data= apiData.read();
  const [areaFilter,setAreaFilter]=useState();
  const [nameFilter,setNameFilter]=useState();

  useEffect(()=>{
    let dataFilter=data.filter(employee=>employee.area===area);
    setAreaFilter(dataFilter);
  },[area,data])
  

  const searchFilter=({target})=>{
    target.value 
    ? setNameFilter(areaFilter.filter(employee=>employee.profile.name.toLowerCase().includes(target.value.toLowerCase())))
    :setNameFilter(areaFilter)
    
  }
  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
       <div className="flex gap-2 items-center bg-gray-500 rounded-2xl ">
          <input onChange={searchFilter} className="rounded-2xl outline-none  p-[6px]
          rounded-r-none text-black" 
          placeholder="nombre" type="search" />

            <IoSearch className="text-[30px]"/>
        </div>
        <div className="flex items-center gap-2">
          <IoPersonAddOutline className="text-[30px] text-green-500" />
          <button>agregar persona</button>
        </div>
        <div>
        </div>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
          <Table data={nameFilter ? nameFilter : areaFilter}/>
      </article>
    </div>
  )
}
export default Employee
