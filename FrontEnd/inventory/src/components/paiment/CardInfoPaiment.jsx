import { useForm } from "react-hook-form";
import InputField from "../helpers/InputField";

const CardInfoPaiment = (items,setLoading) => {
  console.log(items)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const onSubmit= handleSubmit(async(data)=>{})
  return (
    <article>
        <section className="text-center flex flex-col gap-2"> 
          <h1 className="font-semibold font-sans text-[30px]">Genera el reporte de pago </h1>
          <h3 className="font-sans text-gray-700 text-[18px]"> Ingresa un rango entre novedades y fechas  </h3>
        </section>
        <form className="flex gap-2 flex-wrap" >
        <InputField className="hidden"
         name="_id"
         type="string"
         style="hidden"
         register={register}
         styleDiv="hidden "
         styleIput="hidden"
         errors={errors}
        />
        <InputField
          label="Semana"
          name="week"
          type="number"
          style="max-w-[100px]"
          register={register}
          styleDiv="flex-col "
          styleIput="min-w-[260px]"
          // validates
          errors={errors}
          valueAsNumber={true}
          placeHolder="Semana"
        />
        </form>
    </article>
  )
}

export default CardInfoPaiment
