import { useForm } from "react-hook-form";
import InputField from "../../helpers/InputField";
import { areaOptions } from "../../../helpers/options.js";

const FormUpEmployee = ({ item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <section className="flex flex-wrap gap-2">
        <InputField
          label="Cedula"
          name="cc"
          type="number"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Cedula"
          valueAsNumber={true}
        />
        <InputField
          label="Nombre"
          name="nombre"
          type="text"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Nombre"
        />
        <InputField
          label="Apellido"
          name="lastname"
          type="text"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Apellido"
        />

        <InputField
          label="Telefono"
          name="phone"
          type="number"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Telefono"
          valueAsNumber={true}
        />
        <InputField
          label="Cargo"
          name="cargo"
          type="text"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Cargo"
        />
        <InputField
          label="Area"
          name="area"
          register={register}
          errors={errors}
          styleDiv="flex-col  "
          styleIput="max-w-[182px] min-w-[213px] mt-1"
          type="select"
          options={areaOptions}
          placeHolder="Area"
        />
        <InputField
          label="Correo"
          name="email"
          type="text"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="Correo"
        />
        <InputField
          label="Eps"
          name="eps"
          type="text"
          styleDiv="flex-col  "
          styleIput="min-w-[213px]"
          register={register}
          errors={errors}
          placeHolder="EPS"
        />
        <InputField
          label="Salario"
          name="salary"
          type="number"
          styleDiv="flex-col  "
          styleIput="w-[433px]"
          register={register}
          errors={errors}
          placeHolder="Cedula"
          valueAsNumber={true}
        />
        
      </section>
      <div>
        <button className="w-full rounded-[1em] p-2 mt-3 mb-[-8px] bg-green-500">Send</button>
      </div>
    </form>
  );
};

export default FormUpEmployee;
