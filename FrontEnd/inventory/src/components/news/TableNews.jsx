import { useState } from "react";
import { IoCalendarNumber } from "react-icons/io5";
import { formatedDate } from "../../helpers/formateDate.js";
import FormUpHour from "../hours/FormUpHour.jsx";
import SeeTotalHours from "../hours/SeeTotalHours.jsx";
import { Popap } from "../smallComponents/Popap.jsx";

const TableNews = ({datos,setTable}) => {
  const [see, setSee] = useState({
    component: "",
    isTrue: false,
    dataResult: {},
  });
  const changeSee = () => {
    setSee({ component: "", isTrue: false, dataItem: {} });
  };
  return (
    <div className="w-full self-start">
        <div className="flex justify-between mb-[10px]">
            <h1 className=" ml-1 text-[17px] text-gray-500 "> Tabla de Novedades </h1>
            <div className="flex gap-2 pr-[10px] pl-[10px] hover:rounded-[.7em] hover:bg-gray-700 transition-all ">
                <button className="text-gray-500 hover:text-white transition-all "
                onClick={() => {setTable({view:'search',component:'search',save:'',optional:' flex justify-center items-center '})}}
                >Buscar Novedades </button>
                <IoCalendarNumber className="text-[30px] text-green-600" />
          </div>
        </div>
      <table className=" text-[13px] border-collapse text-white rounded-r-lg w-full">
        <thead className="text-white rounded-r-lg  ">
          <tr className="">
            <th className="border-b-[1px] border-gray-500 text-center">Cedula</th>
            <th className="border-b-[1px] border-gray-500 text-center">Recargo</th>
            <th className="border-b-[1px] border-gray-500 text-center">Hora extra </th>
            <th className="border-b-[1px] border-gray-500 text-center">Tipo de Hora</th>
            <th className="border-b-[1px] border-gray-500 text-center">Semana</th>
            <th className="border-b-[1px] border-gray-500 text-center">Fecha</th>
            <th className="border-b-[1px] border-gray-500 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos &&
            datos.map((info) => (
              <tr key={info._id}>
                <td>{info.employee.profile.cc}</td>
                <td className="text-gray-500 text-center">{info.comissions.type}</td>
                <td className="text-center">{info.extraHours.hours} : {info.extraHours.minutes}</td>
                <td className="text-gray-500 text-center">
                  {info.extraHours.type}
                </td>
                <td className="text-center">
                  {info.week}
                </td>
                <td className="text-gray-500 text-center">
                  {formatedDate(info.creationDate)}
                </td>
                <td className=" flex justify-center">
                  <button
                    onClick={() => {
                      setSee({
                        component: "update",
                        isTrue: true,
                        dataResult: info,
                      });
                    }}
                    className="ml-[5px] bg-[##00800017] text-green-500 rounded-[1em] 
             border-[1px] border-green-500 hover:text-white hover:bg-[#52d9669b] p-[4px]"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => {
                      setSee({
                        component: "",
                        isTrue: true,
                        dataResult: info,
                      });
                    }}
                    className="ml-[5px] bg-[##00800017] text-white rounded-[1em] 
             border-[1px] border-white hover:text-[#52d9669b] hover:border-[#52d9669b] p-[4px]"
                  >
                    Total Horas
                  </button>
                  <button
                    onClick={() => {
                      setSee({
                        component: "delete",
                        isTrue: true,
                        dataResult: info,
                      });
                    }}
                    className=" bg-[#ff969601] border-[1px] border-[#952c2c98] text-[#952c2c] hover:text-white
              hover:bg-[#952c2c98] ml-[5px] rounded-[1em] p-[4px]"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {see.component === "update" && see.isTrue === true && (
        <Popap
          see={see.dataResult}
          changeSee={changeSee}
          component={FormUpHour}
        />
      )}
      {see.component === "allHours" && see.isTrue === true && (
        <Popap
          see={see.dataResult}
          changeSee={changeSee}
          component={SeeTotalHours}
        />
      )}
    </div>
  );
};

export default TableNews;
