import { useState } from "react";
import { useForm } from "react-hook-form";
import { createEmployee, createProfile } from "../../services/auth.js";

const CreateEmployee = ({onChangue,changue,see}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [errorReq, setErrorReq] = useState([]);
  const [resOk, setResOk] = useState(undefined);

  const urlProfile = "http://localhost:3000/profile";
  const urlEmployee = (id) => `http://localhost:3000/employee/?id=${id}`;

  const onSubmit = handleSubmit(async (data) => {
    const profile = {
      birthdate: data.birthdate,
      cc: data.cc,
      email: data.email,
      eps: data.eps,
      lastName: data.lastName,
      name: data.name,
      phone: data.phone,
      sex: data.sex,
    };
    setLoading(true);
    try {
      const profileResult = await createProfile(urlProfile, profile);

      const employee = {
        position: data.position,
        area: data.area,
        shift: data.shift,
      };

      const id = profileResult.data._id;
      const employeeResult = await createEmployee(urlEmployee(id), employee);
      console.log(employeeResult);
      setLoading(false);
      setResOk("El usuario se ha creado exitosamente ✔");
      setErrorReq([]);
      return;

    } catch (err) {
      if (err.response.data.message == "duplicate key") {
        setErrorReq([{ key: '1', value: { message: "Esta persona ya esta registrada"} }]);
        console.log('llave duplicada');
        setLoading(false);
        return;
      }

      if (err.response.data.error && typeof err.response.data.error === 'object') {
        const arrError = Object.entries(err.response.data.error).map(([key, value]) => ({
          key,
          value
        }));
        console.log('entro en multiples errores');
        setErrorReq(arrError);
        setLoading(false);
        return;
      }
      console.log('entro abajo');
      setErrorReq([{key:'1',value:{message:err.response.data.message}}]);
      
      setLoading(false);
      return;
    }
  });

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : errorReq.length != 0 ? (
        <div className="flex flex-col gap-4 ">
            <div className='flex gap-4 justify-center'>
                <h1
                    className="font-sans  text-center font-medium text-black p-1  rounded-[0.7em]">
                    Upss.... Algo salio mal
                </h1>
            </div>
            {errorReq.map((e)=>{
                return(
                    <div key={e.key} className="flex gap-2 font-sans">
                        <h1>{e.value.path?e.value.path:'error'}:</h1>
                        <p className=" text-red-600">{e.value.message}</p>
                    </div>
                )
            })}
          <button className="hover:bg-green-600 transition duration-300 ease-in-ou font-sans
           font-medium bg-green-500 p-2 rounded-[.7em] text-white"
            onClick={() => {setErrorReq([]);}}>
            regresar
          </button>
        </div>
        ) 
      : resOk ? (
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-sans font-medium "> {resOk} </h1>
          <div className="flex gap-3">
            <button
              className="flex-1 hover:bg-green-600 transition duration-300 ease-in-ou font-sans font-medium bg-green-400 p-2 rounded-[.7em] text-white"
              onClick={() => { setErrorReq(undefined)}}>
              Seguir agregando
            </button>
            <button
              className="flex-1 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-ou font-sans font-medium  p-2 rounded-[.7em] text-black"
              onClick={() => { onChangue(!changue,!see)}}>
              ver tabla
            </button>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-2 max-w-[400px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 ">
            <div>
              <h1 className="text-[19px] font-medium font-sans">
                Perfil del empleado
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="cc" className="font-sans ">
                  Cedula
                </label>
                <input
                  type="number"
                  className="border-[1px] rounded-lg p-[2px] border-gray-400 
                text-gray-600"
                  {...register("cc", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                    minLength: {
                      value: 1,
                      message: "identificacion invalida",
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.cc && (
                  <span className="text-red-600">{errors.cc.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="name" className="font-sans">
                  Nombre
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px] 
                border-gray-400"
                />
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="lastName" className=" font-sans ">
                  Apellido
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.lastName && (
                  <span className="text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="birthdate" className=" font-sans ">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  {...register("birthdate", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.birthdate && (
                  <span className="text-red-600">
                    {errors.birthdate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="sex" className=" font-sans ">
                  Sexo
                </label>
                <input
                  type="text"
                  {...register("sex", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.sex && (
                  <span className="text-red-600">{errors.sex.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="phone" className=" font-sans ">
                  Telefono
                </label>
                <input
                  type="number"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                    valueAsNumber: true,
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.phone && (
                  <span className="text-red-600">{errors.phone.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="email" className=" font-sans ">
                  Correo
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="eps" className=" font-sans ">
                  Eps
                </label>
                <input
                  type="text"
                  {...register("eps", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.eps && (
                  <span className="text-red-600">{errors.eps.message}</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-[19px] font-medium font-sans">
                Cargo y area
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col gap-2  ">
                <label htmlFor="position" className=" font-sans ">
                  Cargo
                </label>
                <input
                  type="text"
                  {...register("position", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.position && (
                  <span className="text-red-600">
                    {errors.position.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="area" className=" font-sans ">
                  Area
                </label>
                <input
                  type="text"
                  {...register("area", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.area && (
                  <span className="text-red-600">{errors.area.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="shift" className=" font-sans ">
                  Turno
                </label>
                <input
                  type="text"
                  {...register("shift", {
                    required: {
                      value: true,
                      message: "Campo Requerido",
                    },
                  })}
                  className="border-[1px] rounded-lg p-[2px]
            border-gray-400"
                />
                {errors.shift && (
                  <span className="text-red-600">{errors.shift.message}</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className="bg-green-500 text-white rounded-lg self p-1 mt-2 w-full hover:bg-green-600 transition-all ">
              Enviar
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateEmployee;
