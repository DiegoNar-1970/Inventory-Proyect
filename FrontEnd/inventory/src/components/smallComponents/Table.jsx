
import { useState } from 'react'
import img from '../../media/img/img.png'


  const Table = ({data}) => {
  const [see,setSee]=useState(false);
  return (
    <>
         <h1 className=" ml-1 text-[17px] text-gray-500">Personal</h1>
          <table className="text-left text-[13px] border-collapse text-white rounded-r-lg">
            <thead className="text-white rounded-r-lg ">
              <tr className="" >
                <th className="border-b-[1px] border-gray-500">nombre</th>
                <th className="border-b-[1px] border-gray-500">apellido</th>
                <th className="border-b-[1px] border-gray-500">Cedula</th>
                <th className="border-b-[1px] border-gray-500">area</th>
                <th className="border-b-[1px] border-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item)=>(
                  <tr key={item._id}>
                    <td>
                      <div className="flex gap-2 items-center box-border mt-1">
                        <img className="min-w-[30px] max-w-[30px] h-full rounded-[2em] overflow-hidden text-ellipsis"src={img} alt="" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                     <td className="text-gray-500">{item.lastName}</td> 
                    <td >{item.cc}</td> 
                     <td className="text-gray-500">{item.email}</td> 
                    <td>
                      <button onClick={()=>setSee(!see)} className="ml-[5px] bg-green-500 text-white rounded-[1em] p-[4px]">Actualizar</button>
                      <button className=" bg-[#ff969601] border-[1px] border-[#952c2c98] text-[#952c2c98] hover:text-white
                       hover:bg-[#952c2c98] ml-[5px] rounded-[1em] p-[4px]">Eliminar</button>
                      <button className="ml-[5px] bg-green-500 text-white rounded-[1em] p-[4px]">Registrar Hora</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {see && (
           <div className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-start ">
            <div className="bg-white p-4 rounded-lg ">
             <p>Hola, we</p>
             <button onClick={()=>setSee(!see)} className="mt-2 bg-red-500 text-white p-2 rounded">Cerrar</button>
            </div>
           </div>
      )}
    </>
  )
}

export default Table