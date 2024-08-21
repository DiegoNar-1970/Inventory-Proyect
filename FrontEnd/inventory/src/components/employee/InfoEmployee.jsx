import { useState } from "react"
import TablePays from "../../components/employee/TablePays.jsx"
import SearchForm from "../Forms/SearchForm.jsx"

const InfoEmployee = () => {
    const [tables,setTable]=useState({
        view:'pay',
        component:'pay',
        optional:''
    })
  return (
    <section id="main" className="h-screen gap-2     ">
      <article className={`[gird-area:main] bg-[#1b1b1b] rounded-[1em] p-2 text-white ${tables.optional}`}>
           {tables.component === 'pay' ? <TablePays/> : '' }
           {tables.component === 'news' ? <SearchForm/> : '' }
           {tables.component === 'permissions' ? <TablePays/> : '' }
      </article>
      <article className="[grid-area:aside] " >
           <div className={`flex flex-col gap-3 h-full bg-[#1b1b1b] p-2 rounded-[1em]  text-text-menu ${tables.style} text-[16px]`}>
            <div className={`${tables.view ==='pay'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all  `}>
                <button onClick={()=>setTable({view:'pay',component:'pay',optional:''})} >
                    Pagos
                </button>
            </div>
            <div className={`${tables.view ==='news'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all`}
            onClick={()=>setTable({view:'news',component:'news',optional:' flex justify-center items-center '})}>
                <button>Novedades</button>
            </div>
            <div className={`${tables.view ==='permissions'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all`}>
                <button
                 onClick={()=>setTable({view:'permissions',component:'permissions',optional:''})}
                 >Permisos</button>
            </div>
           </div>
      </article>
    </section>
  )
}

export default InfoEmployee
