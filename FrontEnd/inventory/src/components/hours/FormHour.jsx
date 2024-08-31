import { useForm } from "react-hook-form";
import { shiftOptions, validateWeek } from '../../helpers/options.js';
import { creteHour } from "../../services/auth.js";
import { createHourURL } from '../../services/urls.js';
import InputField from "../helpers/InputField";
const FormHour = ({ item,setLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit( async (data) => {
    try{
      setLoading(prevState=>({
        ...prevState,
        view:true,
        component:'loading'
      }))
      const {employee:_, ...rest }=data
      const result= await creteHour(createHourURL(data.employee),rest);
      console.log(result)
      if(result.status===201){
            setLoading((prevState) => ({
            ...prevState,
            component: 'message',
            message: 'Hora registrada con exito ✔',
        }));
      }
    }catch(err){
      console.log(err)
    }

  });

  return (
    <form className="flex gap-2 flex-col" onSubmit={onSubmit}>
      <section className="hidden gap-2">
        <InputField 
          name="employee" 
          type="text"
          register={register}
          errors={errors}  
          defaultValue={item._id} 
          hidden
        />
      </section>
      <section className="flex gap-1 mb-[20px]">
        <h3 className=" font-sans font-medium text-[1.2em]">Empleado:</h3>
        <span className="font-sans text-[1em] self-end">
          {item.profile.name} {item.profile.lastName}
        </span>
      </section>
      <section className="flex gap-4 flex-wrap mb-[20px] ">
        <InputField 
          label="Semana"
          name="week" 
          type="number"
          style="max-w-[195px]"
          register={register} 
          styleDiv='flex-col '
          validates={validateWeek}
          errors={errors}
          valueAsNumber={true}
          placeHolder="Semana"
        />
        <InputField 
          label="Hora de entrada"
          name="checkTime" 
          type="datetime-local" 
          register={register} 
          errors={errors}  
          styleDiv='flex-col '
          placeHolder="Hora de entrada"
          styleIput="max-w-[195px]"
          requiredMessage="Se requiere la hora de entrada"
        />
        <InputField 
          label="Hora de salida"
          name="leaveWork" 
          type="datetime-local" 
          register={register} 
          errors={errors}  
          styleDiv='flex-col '
          styleIput="max-w-[185px]"
          placeHolder="Hora de salida"
          requiredMessage="Se requiere la hora de salida"
        />
        <InputField 
          label="Tipo de turno"
          name="typeHour" 
          type="select" 
          register={register} 
          errors={errors}  
          styleDiv=" max-w-[300px] flex-col justify-center "
          styleIput=" w-[190px] h-[30px] "
          options={shiftOptions}
          requiredMessage="Este campo es obligatorio"
        />
      </section>
      <InputField 
        label="Desayuno"
        name="breakfast" 
        type="checkbox" 
        required={false}
        styleDiv='  justify-between '
        register={register} 
        errors={errors}  
      />
      <InputField 
        label="Almuerzo"
        name="lunch" 
        type="checkbox" 
        required={false}
        styleDiv=' justify-between '
        register={register} 
        errors={errors}  
      />
      <button className="bg-black text-white rounded-lg p-1 mt-2">
        Enviar
      </button>
    </form>
  );
};

export default FormHour;
