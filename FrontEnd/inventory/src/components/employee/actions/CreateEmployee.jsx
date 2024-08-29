import { useState } from "react";
import { useForm } from "react-hook-form";
import { OnSubmit } from "../../../helpers/Funtions.js";
import { areaOptions, sexOptions } from '../../../helpers/options.js';
import ErrorDisplay from "../../errors/ErrorDisplay.jsx";
import InputField from "../helpers/InputField.jsx";
import SuccessDisplay from '../helpers/SuccessDisplay.jsx';

const CreateEmployee = ({ onChangue, see,setSee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorReq, setErrorReq] = useState([]);
  const [resOk, setResOk] = useState('');

  const onSubmit = (data) => {
    setSee({...see, isReRender: true, boolean: true})
    // onChangue('',true,true)
    OnSubmit(data, setLoading, setErrorReq, setResOk);
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
          onContinue={() => { setErrorReq([]); setResOk(''); setSee({...see, isReRender: true, boolean: true}); }}
          onViewTable={() => onChangue(false,false)}
        />
      ) : (
        <form className="flex flex-col gap-2 max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col text-center gap-1 mb-[20px]">
              <h1 className="text-[20px] font-medium font-sans">Formulario</h1>
              <h1 className="text-[20px] font-medium font-sans">Registro de empleado</h1>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
              <InputField label="Cedula" name="cc" type="number" register={register} errors={errors} minLength={{ value: 1, message: "Identificación inválida" }} placeHolder='Cedula' valueAsNumber={true} />
              <InputField label="Nombre" name="name" register={register} errors={errors} placeHolder="Nombre" />
              <InputField label="Apellido" name="lastName" register={register} errors={errors} placeHolder="Apellido" />
              <InputField label="Fecha de nacimiento" name="birthdate" type="date" register={register} errors={errors} 
              placeHolder="Fecha de nacimiento" />
              <InputField label="Sexo" name="sex" register={register} errors={errors} placeHolder="Sexo" type="select" options={sexOptions}/>
              <InputField label="Telefono" name="phone" type="number" register={register} errors={errors} placeHolder="Telefono"  valueAsNumber={true} />
              <InputField label="Correo" name="email" type="email" register={register} errors={errors} placeHolder="example@example.com" />
              <InputField label="Eps" name="eps" register={register} errors={errors} placeHolder="Eps" />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 justify-between">
              <InputField label="Cargo" name="position" register={register} errors={errors} placeHolder="Cargo" />
              <InputField label="Area" name="area" register={register} errors={errors} type="select" options={areaOptions} 
              placeHolder="Area" />
              <InputField  label="Salario" name="baseSalary" type="number" register={register} errors={errors} min={{ value: 100000, message: "El salario debe ser mayor a 100000" }}  placeHolder="Salario" style={'w-full'} valueAsNumber />
            </div>
          </div>
          <div>
            <button className="bg-green-500 text-white rounded-lg self p-2 mt-2 w-full hover:bg-green-600 transition-all">Enviar</button>
          </div>
        </form>
      )}
    </>
  );
};


export default CreateEmployee;
