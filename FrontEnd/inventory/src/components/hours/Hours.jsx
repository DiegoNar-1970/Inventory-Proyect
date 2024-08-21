import { useState } from "react";

import { IoCalendarNumber, IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { UseBodyFetch } from "../../services/UseBodyFetch.jsx";
import SearchForm from '../Forms/SearchForm.jsx';
import HoursTable from "./HoursTable.jsx";

const Hours = () => {
  let { area } = useParams();
  const [formData, setFormData] = useState(null);
  const [nameFilter, setNameFilter] = useState();
  

  let style = "items-center justify-center";
  const [view, setView] = useState(style);

  const url = `http://localhost:3000/workHour/?area=${area}`;
  const transformDate = (date) => date.replace(/-/g, '/');

  const { data, loading } = UseBodyFetch(
    url,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    formData
  );

  const onSubmit = ((condiciones) => {
     condiciones.startDate = transformDate(condiciones.startDate);
     condiciones.endDate = transformDate(condiciones.endDate);
     setFormData(condiciones);
     setView("");
  });

  const searchFilter = ({ target }) => {
    target.value 
    ? setNameFilter(data.filter(obj=>obj.employee.profile.name.toLowerCase()
      .includes(target.value.toLowerCase()))) 
    : setNameFilter();
    

  };

  return (
    <section className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      {formData && (
        <article className="flex gap-2 justify-between items-center bg-fondo-menu rounded-lg p-2 box-border  ">
          <div className="flex gap-2 items-center  bg-gray-500 rounded-2xl ">
            <input
              onChange={searchFilter}
              className="rounded-2xl outline-none  p-[6px]
          rounded-r-none text-black"
              placeholder="nombre"
              type="search"
            />

            <IoSearch className="text-[30px]" />
          </div>
          <div className="flex gap-2 p-2 hover:rounded-[.7em] hover:bg-gray-700 ">
            <button
            onClick={() => {
              setFormData(null), setView(style);
            }}
            >Volver a filtrar por fechas</button>
            <IoCalendarNumber className="text-[30px] text-green-600" />
          </div>
          <div className="flex gap-2 p-2 hover:rounded-[.7em] hover:bg-gray-700 ">
            <button>
                Agregar nueva hora
            </button>
            <IoCalendarNumber className="text-[30px] text-green-600" />
          </div>
        </article>
      )}

      <article
        className={`flex flex-col bg-fondo-menu rounded-lg box-border p-3 ${view}`}
      >
        {!formData 
          ? <SearchForm onSubmit={onSubmit}/>
          : ("")} 
          {formData 
          ? (loading 
          ? ( <div className="loader"></div>) 
          : ( <HoursTable datos={nameFilter ? nameFilter : data} /> )) 
          : ("")}
      </article>
    </section>
  );
};

export default Hours;
