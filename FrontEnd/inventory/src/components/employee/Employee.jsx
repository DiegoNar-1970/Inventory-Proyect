

// import { FaHelmetSafety } from "react-icons/fa6";
import Table from "../smallComponents/Table.jsx";
import Search from "../smallComponents/Search.jsx";
import { useParams } from "react-router-dom";
import { UseFetchArea } from "../helpers/UseFetch.js";
import { useEffect } from "react";

const Employee = () => {

  let {area}=useParams();
  const {data,loading,error}=  UseFetchArea('http://localhost:3000/profile',area);
  
  useEffect(()=>{
    console.log(data);
    console.log(loading);
  },[data,loading,area])


  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
          <Search/>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
        <Table/>
      </article>
    </div>

  )
}
export default Employee
        {/* <div className="flex gap-2 items-center text-center ">
          <FaHelmetSafety className="text-[40px] text-center text-orange-300"/>
          <div className="flex flex-col">
            <h1 className="text-4xl text-green-500">Empleados</h1>
            <span className="text-[14px] font-thin">control de empleados</span>
          </div>
        </div> */}