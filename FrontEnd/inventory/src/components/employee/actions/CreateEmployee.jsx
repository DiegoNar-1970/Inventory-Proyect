import { useState } from "react";
import { useForm } from "react-hook-form";
import { areaOptions, sexOptions } from "../../../helpers/options.js";
import ErrorDisplay from "../../errors/ErrorDisplay.jsx";
import InputField from "../../helpers/InputField.jsx";
import SuccessDisplay from "../../helpers/SuccessDisplay.jsx";

const CreateEmployee = ({ onChangue, see, setSee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorReq, setErrorReq] = useState([]);
  const [resOk, setResOk] = useState("");

  const onSubmit = (data) => {
    console.log(data)
    // setSee({ ...see, isReRender: true, boolean: true });
    // // onChangue('',true,true)
    // OnSubmit(data, setLoading, setErrorReq, setResOk);
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : errorReq.length > 0 ? (
        <ErrorDisplay errors={errorReq} onClose={() => setErrorReq([])} />
      ) : resOk ? (
        <SuccessDisplay
          message={resOk}
          onContinue={() => {
            setErrorReq([]);
            setResOk("");
            setSee({ ...see, isReRender: true, boolean: true });
          }}
          onViewTable={() => onChangue(false, false)}
        />
      ) : (
        <form
          className="flex flex-col gap-2 max-w-[400px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col text-center gap-1 mb-[20px]">
              <h1 className="text-[20px] font-medium font-sans">
                Registro de empleado
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
              <InputField
                label="Cedula"
                name="cc"
                type="number"
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="Cedula"
                valueAsNumber={true}
              />
              <InputField
                label="Nombre"
                name="name"
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="Nombre"
              />
              <InputField
                label="Apellido"
                name="lastName"
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="Apellido"
              />
              <InputField
                label="Fecha de nacimiento"
                name="birthdate"
                type="date"
                styleDiv="flex-col  "
                styleIput="max-w-[200px] min-w-[181px]"
                register={register}
                errors={errors}
                placeHolder="Fecha de nacimiento"
              />
              <InputField
                label="Sexo"
                name="sex"
                styleDiv="flex-col max-w-[180px] "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="Sexo"
                type="select"
                options={sexOptions}
              />
              <InputField
                label="Telefono"
                name="phone"
                type="number"
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="Telefono"
                valueAsNumber={true}
              />
              <InputField
                label="Correo"
                name="email"
                type="email"
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                register={register}
                errors={errors}
                placeHolder="example@example.com"
              />
              <InputField
                label="Eps"
                name="eps"
                register={register}
                errors={errors}
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                placeHolder="Eps"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 justify-between">
              <InputField
                label="Cargo"
                name="position"
                register={register}
                errors={errors}
                styleDiv="flex-col  "
                styleIput="max-w-[200px]"
                placeHolder="Cargo"
              />
              <InputField
                label="Area"
                name="area"
                register={register}
                errors={errors}
                styleDiv="flex-col  "
                styleIput="max-w-[182px] min-w-[182px]"
                type="select"
                options={areaOptions}
                placeHolder="Area"
              />
              <InputField
                label="Salario"
                name="baseSalary"
                type="number"
                register={register}
                errors={errors}
                styleDiv="flex-col   "
                placeHolder="Salario"
                style={"w-full"}
                styleIput="max-w-[182px] min-w-[182px]"

              />
              <InputField
                label="Cargar la imagen"
                name="imgUrl"
                type="file"
                register={register}
                errors={errors}
                styleDiv="flex-col"
                placeHolder="Salario"
                style={"w-full"}
                styleIput="max-w-[182px] min-w-[182px]"

              />
            </div>
          </div>
          <div>
            <button className="bg-green-500 text-white rounded-lg self p-2 mt-2 w-full hover:bg-green-600 transition-all">
              Enviar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateEmployee;
