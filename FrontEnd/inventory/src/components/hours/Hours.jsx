import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCalendarNumber, IoSearch } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { UseBodyFetch } from "../../services/UseBodyFetch.jsx";
import HoursTable from "./HoursTable.jsx";

const Hours = () => {
  let { area } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);
  const [nameFilter, setNameFilter] = useState();
  

  let style = "items-center justify-center";
  const [view, setView] = useState(style);

  const url = `http://localhost:3000/workHour/?area=${area}`;

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

  const onSubmit = handleSubmit((condiciones) => {
    setFormData(condiciones);
    setView("");
  });

  const searchFilter = ({ target }) => {
    const dataArray = [];
    //entries da la llave y el valor de cada objeto que tengamos en un array
    //forEach ejecuta por cada objeto que tengamos [{},{}...]
    Object.entries(data).forEach(([key, hours]) => {
      //asignamos una variable para poder guardar los datos filtrados
      const filteredData = hours.data.filter((hora) =>
        //filtramos por nombre
        hora.employee.profile.name
          .toLowerCase()
          .includes(target.value.toLowerCase())
      );

      if (filteredData.length > 0) {
        //hacemos Push para guardar la nueva informacion en un nuevo array dataArray
        dataArray.push({
          //esto es porque hours mantenga toda su informacion y no solo se guarde el array filtrado
          ...hours,
          //en hours el contenido de data se cambia por el nuevo contenido filtrado
          data: filteredData,
        });
      }
    });
    setNameFilter(dataArray);
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
        {!formData ? (
          <form
            action=""
            className="p-[20px] flex flex-col relative  
               w-[50%] min-w-[305px] max-w-[354px] rounded-xl outline outline-[2px] outline-[#393a3c] "
            onSubmit={onSubmit}
          >
            <h3 className="text-[25px] font-sans font-medium mb-[1px] ">
              Filtrar por fechas
            </h3>
            <h3 className="text-[15px] font-sans font-ligth mb-[30px] text-[#6b7280]">
              Selecciona el rango de fechas y semanas para consultar.
            </h3>
            <div className="flex gap-5 flex-wrap relative">
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="startWeek"
                  className="font-light font-sans text-[#6b7280] text-[17px]"
                >
                  Semana inicial
                </label>
                <input
                  className=" rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c]
                    focus:outline-none border-none"
                  type="number"
                  {...register("startWeek", {
                    required: {
                      value: true,
                      message: "Se necesita una semana",
                    },
                    max: {
                      value: 60,
                      message: "Debe ser menor de 60",
                    },
                    min: {
                      value: 0,
                      message: "minimo 1",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                />
                {errors.startWeek && (
                  <span className="text-red-600">
                    {errors.startWeek.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="endWeek"
                  className="font-light font-sans text-[#6b7280] text-[17px]"
                >
                  Semana Final
                </label>
                <input
                  className="rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c]
                    focus:outline-none border-none"
                  type="number"
                  {...register("endWeek", {
                    required: {
                      value: true,
                      message: "Se necesita una semana",
                    },
                    max: {
                      value: 60,
                      message: "Debe ser menor de 60",
                    },
                    min: {
                      value: 0,
                      message: "minimo 1",
                    },
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                />
                {errors.endWeek && (
                  <span className="text-[15px] text-red-600">
                    {errors.endWeek.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="startDate"
                  className="font-light font-sans text-[#6b7280] text-[17px]"
                >
                  Fecha inicial
                </label>
                <input
                  placeholder="Fecha"
                  className=" max-w-[145px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none "
                  type="date"
                  {...register("startDate", {
                    required: {
                      value: true,
                      message: "Se necesita una fecha",
                    },
                  })}
                  defaultValue={0}
                />
                {errors.startDate && (
                  <span className="text-red-600">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="endDate"
                  className="font-light font-sans text-[#6b7280] text-[17px]"
                >
                  Fecha final
                </label>
                <input
                  placeholder={"semana"}
                  className="max-w-[145px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none"
                  type="date"
                  {...register("endDate", {
                    required: {
                      value: true,
                      message: "Se necesita una fecha",
                    },
                  })}
                  defaultValue={0}
                />
                {errors.endDate && (
                  <span className="text-red-600">{errors.endDate.message}</span>
                )}
              </div>
            </div>
            <button className="flex-1 bg-[#22c55e] text-black p-1 rounded-[.80em] mt-[50px]">
              Consultar
            </button>
          </form>
        ) : (
          ""
        )}
        {formData ? (
          loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <HoursTable datos={nameFilter ? nameFilter : data} />
            </>
          )
        ) : (
          ""
        )}
      </article>
    </section>
  );
};

export default Hours;
