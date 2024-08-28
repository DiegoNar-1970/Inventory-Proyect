

// import { FaHelmetSafety } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoPersonAddOutline, IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { fetchEmployees } from "../../helpers/fetchNative.js";
import Table from "../smallComponents/Table.jsx";
import CreateEmployee from "./CreateEmployee.jsx";



const Employee = () => {

  let {area}=useParams();
  const [areaFilter,setAreaFilter]=useState();
  const [nameFilter,setNameFilter]=useState();
  const [see,setSee]=useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changue, setChangue] = useState(0);

  const onChangue = (change,see)=>{
    setChangue(change=>change+1);
    setSee(see);
  }

  const closePop=(value)=>{
    setSee(value)
  }

  useEffect(() => { 
    fetchEmployees(setAreaFilter,setLoading,setError,area);
  }, [area,changue]);
  

  const searchFilter=({target})=>{
    target.value 
    ? setNameFilter(areaFilter.filter(employee=>employee.profile.name.toLowerCase().includes(target.value.toLowerCase())))
    :setNameFilter(areaFilter);
  }

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

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
          <Table data={nameFilter ? nameFilter : areaFilter} onChangue={onChangue}/>
      </article>
      {see ? 
           <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-start ">
            <div className=" m-auto p-auto bg-gray-200   rounded-[.7em] flex flex-col  text-black min-w-[400px] max-w-[600px] p-5 ">
              
                <CreateEmployee onChangue={onChangue} changue={changue} see={see} closePop={closePop}/>
              
              <div className='w-[100%] mt-[.7em]'>
                <button className="w-[100%] p-2 rounded-[.5em] 
                font-sans font-medium hover:bg-black transition duration-300 ease-in-ou  hover:text-white  text-black "
                onClick={()=>setSee(!see)} >Cerrar</button> 
              </div>
            </div>
           </div>
          :''}
    </div>
  )
}
export default Employee
