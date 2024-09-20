import { Suspense, useContext, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaAddressBook, FaListCheck } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { transformDate } from "../../../helpers/Funtions.js";
import { getNews } from "../../../services/auth.js";
import { getByIdNewsURL } from "../../../services/urls.js";
import TablePays from "../../employee/pays/TablePays.jsx";
import SearchForm from "../../Forms/SearchForm.jsx";
import TableNews from "../../news/TableNews.jsx";
import Table from "../../smallComponents/Table.jsx";
import { FaHourglassHalf } from "react-icons/fa";

const InfoEmployee = () => {
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState({});
    const [tables,setTable]=useState({
        view:'permissions',
        component:'permissions',
        optional:'',
        responseOk:false,
    })
 const {saveUser}=useContext(AuthContext);
 const onSubmit = (async (condiciones) => {
  try {
    setTable({...tables,component:''})
    setLoading(true);
    condiciones.startDate = transformDate(condiciones.startDate);
    condiciones.endDate = transformDate(condiciones.endDate);
    const response=await getNews(getByIdNewsURL(saveUser._id),condiciones);
    console.log(response);
    if(response.status===200||response.status===201){
      setData(response.data);
      setTable({component:'table',optional:'',view:'table',responseOk:true});

      setLoading(false);
      return;
    }
    console.log('cuando entra aqui?');
    setLoading(false);
  } catch (error) {
    setTable({...tables,component:'error'})
    console.log(error)
    setData(error.response.data.message)
    setLoading(false);  
    console.log(error);
  }

});
  return (
    <Suspense fallback={<div className="loader"></div>}>
    <section id="main" className="h-screen gap-3     ">
      <article className=" [grid-area:header] p-2 flex flex-col bg-[#1b1b1b] rounded-[1em] text-white pb-[15px] ">
          <Table data={saveUser}/>
      </article>
      <article className={`[grid-area:main] bg-[#1b1b1b] rounded-[1em] text-white ${tables.optional} p-2 overflow-auto  `}>
           {loading && <div className="loader"></div>}
           {tables.component === 'pay' && <TablePays/> }
           {tables.component === 'permissions' && <TablePays/>  }
           {tables.component === 'search' ? tables.responseOk
            ? <TableNews datos={data} setTable={setTable} /> 
            : <SearchForm onSubmit={onSubmit} saveUser={saveUser} />
          : null}
           {tables.component=== 'table' && <TableNews datos={data} setTable={setTable}/>  }
           {tables.component=== 'error' && <p className="text-red-500"> {data} {':('}</p>  }
      </article>
      <article className="[grid-area:aside] " >
           <div className={`flex flex-col gap-3 h-full bg-[#1b1b1b] p-2 rounded-[1em]  text-text-menu ${tables.style} text-[16px]`}>
            <div className={`${tables.view ==='pay'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center `}>
                  <FaMoneyCheckAlt className="text-[20px]"/>
                <button onClick={()=>setTable(prevState=>({...prevState,view:'pay',component:'pay',optional:''}))} >
                    Pagos
                </button>
            </div>
            <div className={`${tables.view ==='table'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center`}>
              <FaAddressBook className="text-[20px]"/>
                <button onClick={()=>setTable(prevState=>({...prevState,optional:' flex justify-center items-center ',view:'table',component:'search'}))}
                >Novedades</button>
            </div>
            <div className={`${tables.view ==='permissions'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center`}>
            <FaListCheck className="text-[20px]"/>
                <button
                 onClick={()=>setTable(prevState=>({...prevState,view:'permissions',component:'permissions',optional:''}))}
                 >Permisos</button>
            </div>
            <div className={`${tables.view ===''?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all flex gap-2 items-center`}>
            <FaHourglassHalf className="text-[20px]"/>
                <button
                 onClick={()=>setTable(prevState=>({...prevState,view:'',component:'',optional:''}))}
                 >Horas</button>
            </div>
           </div>
      </article>
    </section>
    </Suspense> 
  )
}

export default InfoEmployee
