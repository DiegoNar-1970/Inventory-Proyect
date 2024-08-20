import { useForm } from "react-hook-form";
import { formatedDateLocal } from "../../helpers/formateDate.js";

const FormUpHour = ({ item }) => {
console.log('en item',item);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex gap-2 flex-wrap" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 max-sm:flex-1 ">
        <label htmlFor="cc" className="font-medium font-sans ">
          Identificacion
        </label>
        <input
          type="text"
          defaultValue={item.employee.profile.cc}
          readOnly
          className="border-[1px] rounded-lg p-[2px]
        border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-2 max-sm:flex-1">
        <label htmlFor="cc" className="font-medium font-sans ">
          Nombre
        </label>
        <input
          type="text"
          defaultValue={item.employee.profile.name}
          readOnly
          className="border-[1px] rounded-lg p-[2px]
        border-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2 max-sm:flex-1">
        <label htmlFor="week" className="font-medium font-sans ">
          Semana
        </label>
        <input
          type="number"
          {...register("week", {
            required: {
              value: true,
              message: "Se necesita la Semana",
            },
          })}
          className="border-[1px] rounded-lg p-[2px] 
        border-gray-400"
          defaultValue={item.week}
        />
        {errors.position && (
          <span className="text-red-600">{errors.position.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 max-sm:flex-1">
        <label htmlFor="checkTime" className="font-medium font-sans ">
          Hora de entrada
        </label>
        <input
          type="datetime-local"
          {...register("checkTime")}
          className="border-[1px] rounded-lg p-[2px] 
        border-gray-400 max-w-[180px] max-sm:flex-1"
          defaultValue={formatedDateLocal(item.checkTime)}
        />
        {errors.checkTime && (
          <span className="text-red-600">{errors.checkTime.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 max-sm:flex-1">
        <label htmlFor="leaveWork" className="font-medium font-sans ">
          Hora de salida
        </label>
        <input
          type="datetime-local"
          {...register("leaveWork")}
          className="border-[1px] rounded-lg p-[2px] 
        border-gray-400 max-sm:min-w-[180px] max-sm:max-w-[70px] max-xl:min-w-[370px] max-2xl:min-w-[370px]"
          defaultValue={formatedDateLocal(item.leaveWork)}
        />
        {errors.checkTime && (
          <span className="text-red-600">{errors.checkTime.message}</span>
        )}
      </div>
      
      <div className="flex-1 flex gap-2 flex-col max-sm:min-w-[300px] max-sm:max-w-[70px] ">
        <div className=" flex gap-2 items-center justify-between">
          <label htmlFor="isHoliday" className="font-medium font-sans ">
            Marcar solo si es festivo 
          </label>
          <input
            type="checkbox"
            {...register("isHoliday", {
              require: {
                value: true,
                message: "se requieren horas",
              },
            })}
            defaultChecked={item.isHoliday}
            className="border-[1px] rounded-lg p-[2px] border-gray-400"
          />
        </div>
        <div className=" flex fle-1 gap-2 items-center justify-between">
          <label htmlFor="breakfast" className="font-medium font-sans ">
            Desayuno 
          </label>
          <input
            type="checkbox"
            {...register("breakfast", {
              require: {
                value: true,
                message: "se requieren horas",
              },
            })}
            defaultChecked={item.breakfast}
            className="border-[1px] rounded-lg p-[2px] border-gray-400"
          />
        </div>
        <div className=" flex fle-1 gap-2 items-center justify-between">
          <label htmlFor="lunch" className="font-medium font-sans ">
            Almuerzo 
          </label>
          <input
            type="checkbox"
            {...register("lunch", {
              require: {
                value: true,
                message: "se requieren horas",
              },
            })}
            defaultChecked={item.lunch}
            className="border-[1px] rounded-lg p-[2px] border-gray-400"
          />
        </div>
        <button className="bg-black text-white rounded-lg self p-1 mt-2">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormUpHour;
