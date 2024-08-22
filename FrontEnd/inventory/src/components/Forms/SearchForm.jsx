import { useForm } from "react-hook-form";

const SearchForm = ({onSubmit}) => {
  const {
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm();

   const data = handleSubmit ((data)=>{
    onSubmit(data)
  })

  return (
    <form
            action=""
            className="p-[20px] flex flex-col  
               w-[50%] min-w-[305px] max-w-[354px] rounded-xl outline outline-[2px] outline-[#393a3c] "
            onSubmit={data}
          >
            <h3 className="text-[25px] font-sans font-medium mb-[1px] ">
              Filtrar por fechas
            </h3>
            <h3 className="text-[15px] font-sans font-ligth mb-[30px] text-[#6b7280]">
              Selecciona el rango de fechas y semanas para consultar.
            </h3>
            <div className="flex gap-4 flex-wrap flex-1 ">
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
                    focus:outline-none border-none w-[149px]"
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
                    focus:outline-none border-none w-[149px]"
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
                  className=" w-[149px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none"
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
                  className="w-[149px] rounded-lg p-[2px] border-gray-400
                     text-white border-t-[0px] bg-[#393a3c] placeholder-white
                    focus:outline-none border-none "
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
  )
}

export default SearchForm
