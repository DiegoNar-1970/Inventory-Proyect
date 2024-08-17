import { useForm } from "react-hook-form";

const FormHour = ({ item: { dataItem } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex gap-2 flex-col" onSubmit={onSubmit}>
      <section className="hidden gap-2">
        <label
          htmlFor="employee"
          className="text-[20px]  font-medium font-sans "
        ></label>
        <input
          type="text"
          className="border-[1px] text-black rounded-lg p-[2px] border-gray-400"
          {...register("employee")}
          defaultValue={dataItem._id}
        />
      </section>
      <section className="flex gap-1 mb-[20px]  ">
        <h3 className=" font-sans font-medium text-[1.2em]">Empleado:</h3>
        <span className="font-sans text-[1em] self-end   ">
          {dataItem.profile.name} {dataItem.profile.lastName}
        </span>
      </section>
      <section className="flex gap-2 flex-wrap mb-[20px]">
        <article className="flex flex-col gap-2 ">
          <label htmlFor="week" className="font-medium font-sans ">
            Semana
          </label>
          <input
            type="number"
            {...register("week", {
              required: {
                value: true,
                message: "Se necesita una semana",
              },
              valueAsNumber: true,
              max: {
                value: 60,
                message: "semanas maximas 60",
              },
              min: {
                value: 1,
                message: "numero no permitido",
              },
              pattern: {
                value: /^(0?[0-9]|1[0-2])$/,
                message: "Ingrese un número válido del 0 al 12",
              },
            })}
            className="border-[1px] rounded-lg p-[2px] border-gray-400 max-w-[200px]"
          />
          {errors.week && (
            <span className="text-red-600">{errors.week.message}</span>
          )}
        </article>
        <article className="flex flex-col gap-2">
          <label htmlFor="checkTime" className="font-medium font-sans self-end ">
            Hora de entrada
          </label>
          <input
            type="datetime-local"
            {...register("checkTime", {
              required: {
                value: true,
                message: "se requiere la hora de entrada",
              },
            })}
            
            className="border-[1px] rounded-lg p-[2px] border-gray-400  max-w-[200px]"
          />
          {errors.checkTime && (
            <span className="text-red-600 max-w-[195px]">{errors.checkTime.message}</span>
          )}
        </article>
        <article className="flex flex-col gap-2">
          <label htmlFor="leavework" className="font-medium font-sans ">
            Hora de salida
          </label>
          <input
            type="datetime-local"
            {...register("leavework", {
              required: {
                value: true,
                message: "se requiere la hora de salida",
              },
            })}
            defaultChecked=""
            className="border-[1px] rounded-lg p-[2px] border-gray-400 max-w-[185px] "
          />
          {errors.leavework && (
            <span className="text-red-600 max-w-[195px]">{errors.leavework.message}</span>
          )}
        </article>
        <article className="flex flex-col gap-2 " >
          <label htmlFor="creationDate" className="font-medium font-sans self-end">
            Fecha de Creacion
          </label>
          <input
            type="datetime-local"
            {...register("creationDate", {
              required: {
                value: true,
                message: "se requiere la hora de salida",
              },
            })}
            defaultChecked=""
            className="border-[1px] rounded-lg p-[2px] border-gray-400 max-w-[195px] "
          />
          {errors.creationDate && (
            <span className="text-red-600 max-w-[195px]">{errors.creationDate.message}</span>
          )}
        </article>
      </section>
      <article>
          <div className=" flex gap-2 items-center justify-between ">
            <label htmlFor="breakfast" className="font-medium font-sans ">
             Desayuno
            </label>
            <input
              type="checkbox"
              {...register("breakfast")}
              defaultChecked=""
              className="border-[1px] rounded-lg p-[2px] border-gray-400 w-[20px] h-[20px]  "
            />
          </div>
      </article>
      <article>
          <div className=" flex gap-2 items-center justify-between ">
            <label htmlFor="lunch" className="font-medium font-sans ">
              Almuerzo
            </label>
            <input
              type="checkbox"
              {...register("lunch")}
              defaultChecked=""
              className="border-[1px] rounded-lg p-[2px] border-gray-400 w-[20px] h-[20px]  "
            />
          </div>
      </article>
      <article>
          <div className=" flex gap-2 items-center justify-between ">
            <label htmlFor="isHoliday" className="font-medium font-sans ">
             Marcar solo si es festivo
            </label>
            <input
              type="checkbox"
              {...register("isHoliday", {
                require: {
                  value: true,
                  message: "se requieren horas",
                },defaultChecked: false
              })}
              defaultChecked=""
              className="border-[1px] rounded-lg p-[2px] border-gray-400 w-[20px] h-[20px]  "
            />
          </div>
      </article>
      <button className="bg-black text-white rounded-lg self p-1 mt-2">
          Enviar
        </button>
    </form>
  );
};

export default FormHour;
