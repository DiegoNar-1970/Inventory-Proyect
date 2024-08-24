import { Suspense, useContext, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaAddressBook, FaListCheck } from "react-icons/fa6";
import TablePays from "../../components/employee/TablePays.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import SearchForm from "../Forms/SearchForm.jsx";
import Table from "../smallComponents/Table.jsx";
// import { getByIdEmployee } from "../../services/auth.js";

const InfoEmployee = () => {
    const [tables,setTable]=useState({
        view:'pay',
        component:'pay',
        optional:''
    })
 const {saveUser}=useContext(AuthContext);
  return (
    <Suspense fallback={<div className="loader"></div>}>
    <section id="main" className="h-screen gap-3     ">
      <article className=" [grid-area:header] p-2 flex flex-col bg-[#1b1b1b] rounded-[1em] text-white pb-[15px] ">
          <Table data={saveUser}/>
      </article>
      <article className={`[grid-area:main] bg-[#1b1b1b] rounded-[1em] p-2 text-white ${tables.optional}`}>
           {tables.component === 'pay' ? <TablePays/> : '' }
           {tables.component === 'news' ? <SearchForm/> : '' }
           {tables.component === 'permissions' ? <TablePays/> : '' }
      </article>
      <article className="[grid-area:aside] " >
           <div className={`flex flex-col gap-3 h-full bg-[#1b1b1b] p-2 rounded-[1em]  text-text-menu ${tables.style} text-[16px]`}>
            <div className={`${tables.view ==='pay'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center `}>
                  <FaMoneyCheckAlt className="text-[20px]"/>
                <button onClick={()=>setTable({view:'pay',component:'pay',optional:''})} >
                    Pagos
                </button>
            </div>
            <div className={`${tables.view ==='news'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center`}>
              <FaAddressBook className="text-[20px]"/>
                <button onClick={()=>setTable({view:'news',component:'news',optional:' flex justify-center items-center '})}
                >Novedades</button>
            </div>
            <div className={`${tables.view ==='permissions'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center`}>
            <FaListCheck className="text-[20px]"/>
                <button
                 onClick={()=>setTable({view:'permissions',component:'permissions',optional:''})}
                 >Permisos</button>
            </div>
           </div>
      </article>
    </section>
    </Suspense> 
  )
}

export default InfoEmployee
