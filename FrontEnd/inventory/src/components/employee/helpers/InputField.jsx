
const InputField = ({ label, name, type = "text", register, errors, options = [], placeHolder, style, ...rest }) => {
    return (
      <div className= {`flex flex-col gap-2 ${style}`}>

        <label htmlFor={name} className="font-sans">{label}</label>
        {type === "select" ? (
                <select
                    id={name}
                    {...register(name, { required: "Campo Requerido", ...rest })}
                    className={`border-[1px] rounded-lg p-[2px] border-gray-400 min-w-[185px]`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    type={type}
                    placeholder={placeHolder}
                    {...register(name, { required: "Campo Requerido", ...rest })}
                    className="border-[1px] rounded-lg p-[2px] border-gray-400 
                text-gray-600 min-w-[185px]"
                />
            )}
        {errors[name] && <span className="text-red-600">{errors[name].message}</span>}
      </div>
    );
  };
export default InputField;