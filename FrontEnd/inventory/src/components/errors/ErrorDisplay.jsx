import { IoCloseOutline } from "react-icons/io5";


const ErrorDisplay = ({ errors, onClose }) => (
    <div className="flex flex-col gap-4 w-full">
      <div className='flex gap-4 justify-between items-center w-full mb-[15px]'>
        <h1 className="font-sans font-medium text-red-700 text-[1.3em] rounded-[0.7em]">ERROR!!</h1>
        <button className="text-[40px] text-black" onClick={onClose}><IoCloseOutline /></button>
      </div>
      {errors.map((e, i) => (
        <div key={i} className="flex flex-col gap-2 font-sans m-1 pl-4 pr-4">
          <div className="flex gap-2">
            <span className="w-[25px] rounded-md bg-red-700 text-center text-white">{i + 1}</span>
            <p className="text-black">{e.value.message}</p>
          </div>
        </div>
      ))}
      <div className="flex mt-[20px]">
        <button className="font-sans flex-1 font-medium bg-green-700 text-white p-2 rounded-[.7em]" onClick={onClose}>
          Regresar
        </button>
      </div>
    </div>
  );

export default ErrorDisplay 
