import RenderField from "./helpers/RenderField.jsx";

const InputField = ({ label, name, type = "text", register, errors, options = [], placeHolder, style, ...rest }) => {
    return (
      <div className= {`flex flex-col gap-2 ${style}`}>
        <label htmlFor={name} className="font-sans">{label}</label>
            <RenderField
                register={register}
                type={type}
                name={name}
                options={options}
                placeHolder={placeHolder}
                rest={rest}
            />
        {errors[name] && <span className="text-red-600">{errors[name].message}</span>}
      </div>
    );
  };
export default InputField;