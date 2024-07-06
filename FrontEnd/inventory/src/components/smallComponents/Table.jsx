
import img from '../../media/img/img.png'

const Table = ({data}) => {
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
                <th className="border-b-[1px] border-gray-500">Estado</th>
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
                    <td>💚activo 🖤</td> 
                    <td>
                      <button className="bg-green-500 text-white rounded-[1em] p-[2px]">Actualizar</button>
                    </td>
                </tr>
              ))}
              
            </tbody>
          </table>
    </>
  )
}

export default Table