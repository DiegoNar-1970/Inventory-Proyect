import { useState } from "react"

const InfoEmployee = () => {
    const [tables,setTable]=useState({
        view:'',
        component:''
    })
  return (
    <section id="main" className="h-screen gap-2     ">
      <article className="[gird-area:main] bg-[#1b1b1b] rounded-[1em] p-2 text-white">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, ullam. Sequi corporis fugit praesentium maxime et modi explicabo consequatur, veritatis cumque. Expedita ullam voluptates modi, perferendis velit repudiandae dolorum incidunt.</p>
      </article>
      <article className="[grid-area:aside] " >
           <div className={`flex flex-col gap-3 h-full bg-[#1b1b1b] p-2 rounded-[1em]  text-text-menu ${tables.style} text-[16px]`}>
            <div className={`${tables.view ==='pay'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all  `}>
                <button onClick={()=>setTable({view:'pay',componen:'pay'})}>
                    Pagos
                </button>
            </div>
            <div className={`${tables.view ==='news'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all`}
            onClick={()=>setTable({view:'news',componen:'news'})}>
                <button>Novedades</button>
            </div>
            <div className={`${tables.view ==='permissions'?'bg-gray-600 text-white ':''}bg-[#202124] rounded-[1em] p-2 hover:bg-gray-600 hover:text-white transition-all`}>
                <button
                 onClick={()=>setTable({view:'permissions',componen:'permissions'})}
                 >Permisos</button>
            </div>
           </div>
      </article>
    </section>
  )
}

export default InfoEmployee
