const InputField = ({ 
    label, 
    name, 
    type = "text", 
    register, 
    errors, 
    validates = {}, 
    options = [], 
    placeHolder, 
    styleIput, 
    styleDiv, 
    defaultValue, 
    required, 
    ...rest 
  }) => {
    return (
      <div className={`flex gap-2 ${styleDiv}`}>
        <label htmlFor={name} className="font-sans">{label}</label>
        {type === "select" ? (
          <select
            id={name}
            {...register(name, { 
              required: "Campo Requerido", 
              validate: value => value !== "" || "Seleccione una opción válida", 
              ...validates, 
              ...rest 
            })}
            className={`outline outline-[1px] rounded-lg p-[2px] outline-gray-400 ${styleIput}`}
          >
            <option value="">Turno</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <input
            id={name}
            type={type}
            placeholder={placeHolder}
            {...register(name, { required: required, ...validates, ...rest })}
            defaultValue={defaultValue}
            className={`border-[1px] rounded-lg p-[2px] border-gray-400 text-gray-600 ${styleIput}`}
          />
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeHolder}
            {...register(name, { required: "Campo Requerido", ...validates, ...rest })}
            defaultValue={defaultValue}
            className={`border-[1px] rounded-lg p-[2px] border-gray-400 text-gray-600 ${styleIput}`}
          />
        )}
        {errors[name] && <span className="text-red-600">{errors[name].message}</span>}
      </div>
    );
  };
  export default InputField;