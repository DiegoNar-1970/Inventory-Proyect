

const RenderField = ({ register, type, name, options = [], rest, placeHolder }) => {
    return (
        <>
        {console.log('ress',rest)}
            {type === "select" ? (
                <select
                    id={name}
                    {...register(name, { required: "Campo Requerido", ...rest })}
                    className="border-[1px] rounded-lg p-[2px] border-gray-400"
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
                    className="border-[1px] rounded-lg p-[2px] border-gray-400 min-w-[185px]"
                />
            )}
        </>
    );
};

export default RenderField;
