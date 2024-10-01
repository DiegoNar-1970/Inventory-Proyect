import { useForm } from "react-hook-form";
import InputField from "../helpers/InputField";

const CardInfoPaiment = ({item,setLoading}) => {
  console.log('este es el item',item)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit= handleSubmit(async(data)=>{
    console.log('porque se re renderiza?',data)
  })
  return (
    <article   className="flex flex-col gap-10">
        <section className="text-center flex flex-col gap-2"> 
          <h1 className="font-semibold font-sans text-[30px]">Genera el reporte de pago </h1>
          <h3 className="font-sans text-gray-500 text-[18px]"> Ingresa un rango entre novedades y fechas  </h3>
        </section>
        <form   className="flex gap-3 flex-wrap" >
        <InputField 
         label="Turno Inicial"
         name="startDate"
         type="datetime-local"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"

        />
        <InputField 
         label="Turno Final"
         name="endDate"
         type="datetime-local"
         style="max-w-[200px]"
         register={register}
         errors={errors}
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
        />

        <InputField 
         label="Semana inicial"
         name="startWeek"
         type="number"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
         placeHolder="Semana"
        />

        <InputField 
         label="Semana Final"
         name="endWeek"
         type="number"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
         placeHolder="Semana"

        />
        <InputField 
        label="Fecha Novedad Inicial"
         name="newsDateS"
         type="datetime-local"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"

        />
        <InputField 
         label="Fecha Novedad Final "
         name="newsDateE"
         type="datetime-local"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
        />
                <InputField 
         label="Semana Inicial Novedades"
         name="newsEndW"
         type="number"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
         
         />
        <InputField 
         label="Semana Final Novedades"
         name="newsStartW"
         type="number"
         register={register}
         errors={errors}
         style="max-w-[100px]"
         styleDiv="flex-col "
         styleIput="min-w-[260px]"
        />

        <button onClick={onSubmit}
        className="bg-green-600 text-white rounded-[17px] 
        p-2 mt-2 mb-[-5px] hover:bg-green-700 w-full">
          Registrar
      </button>
        </form>
    </article>
  )
}

export default CardInfoPaiment
