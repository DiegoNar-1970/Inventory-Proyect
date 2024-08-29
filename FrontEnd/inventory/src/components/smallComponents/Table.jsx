
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import img from '../../media/img/img.png';
import { deleteEmployee } from '../../services/auth.js';
import FormUpEmployee from '../employee/Forms/FormUpEmployee.jsx';
import Profile from '../employee/actions/Profile.jsx';
import FormHour from '../hours/FormHour.jsx';
import { Popap } from './Popap.jsx';

  const Table = ({data,onChangue,setLoading}) => {
     //recuerda que solo los de administración pueden tener la opcion de ver el perfil de un empleado con sus pagos etc 
    const {saveUser,setUserSave}=useContext(AuthContext);
    const location = useLocation();
    const pathLocation=location.pathname
    const navigate = useNavigate(); 
    
  const [see,setSee]=useState({
    component:'',
    isTrue:false,
    dataItem:{}
  });

    useEffect(() => {
      if(pathLocation.includes('employee')) setUserSave(null);
    }, []);

    if(saveUser!=null) data=[saveUser];

  const delEmployee = async (item) => {
    setLoading(true);
    await deleteEmployee(`http://localhost:3000/profile/${item.profile._id}`);
    await deleteEmployee(`http://localhost:3000/employee/${item._id}`);
    onChangue(false,false);
  }

  const changeSee=()=>{
    setSee({
      component:'',
      isTrue:false,
      dataItem:{}
    });
  }

  const seeProfile=(id,item)=>{
    setUserSave(item);
    navigate(`/profileEmployee/${id}`);
  }

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
                        <span>{item.profile.name}</span>
                      </div>
                    </td>
                     <td className="text-gray-500">{item.profile.lastName}</td> 
                    <td >{item.profile.cc}</td> 
                     <td className="text-gray-500">{item.area}</td> 
                    <td >
                    <button onClick={()=>{setSee({
                          component:'hour',
                          isTrue:true,
                          dataItem:item
                        })}}
                    className="ml-[5px] bg-[##00800017] text-green-500 rounded-[1em] 
                      border-[1px] border-green-500 hover:text-white hover:bg-[#52d9669b] p-[4px]">Registrar Hora</button>
                      <button onClick={()=>{
                        setSee({
                          component:'update',
                          isTrue:true,
                          dataItem:item
                        })
                      }} className="ml-[5px] bg-[##00800017] text-white rounded-[1em] 
                      border-[1px] border-white hover:text-[#52d9669b] hover:border-[#52d9669b] transition-all p-[4px]">Actualizar</button>
                      {pathLocation.includes('profileEmployee') 
                      ? <button onClick={()=>{
                        setSee({
                          component:'profile',
                          isTrue:true,
                          dataItem:item
                        })
                      }}  
                          className="ml-[5px] bg-[##00800017] text-white rounded-[1em] border-[1px] border-white hover:text-[#52d9669b] 
                        hover:border-[#52d9669b] p-[4px]">
                          Ver Perfil
                        </button>
                      : <button onClick={()=>seeProfile(item._id,item)}  
                          className="ml-[5px] bg-[##00800017] text-white rounded-[1em] border-[1px] border-white hover:text-[#52d9669b] 
                          hover:border-[#52d9669b] p-[4px]">
                          Informacion Personal
                        </button>
                      }
                      {pathLocation.includes('profileEmployee')
                        ?''
                        : <button onClick={()=>delEmployee(item)}
                        className=" bg-[#ff969601] border-[1px] border-[#952c2c98] text-[#952c2c] hover:text-white
                        hover:bg-[#952c2c98] ml-[5px] rounded-[1em] p-[4px]">Eliminar</button>
                      }
                     
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {see.component === 'update' && see.isTrue===true && (
          
          <Popap
          see={see.dataItem}
          changeSee={changeSee}
          component={FormUpEmployee}/>
          )}
          {see.component === 'profile' && see.isTrue===true && (
           <Popap
            see={see.dataItem}
            changeSee={changeSee}
            component={Profile} 
           />
          )}
          {see.component === 'hour' && see.isTrue===true && (
           <Popap
            see={see.dataItem}
            changeSee={changeSee}
            component={FormHour}

           />
          )}
    </>
  )
}

export default Table
// ()=>{
//   setSee({
//     component:'profile',
//     isTrue:true,
//     dataItem:item
//   })
// }