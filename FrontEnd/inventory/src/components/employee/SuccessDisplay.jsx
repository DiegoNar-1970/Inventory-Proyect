const SuccessDisplay = ({ message, onContinue, onViewTable }) => (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="font-sans font-medium">{message}</h1>
      <div className="flex gap-3">
        <button
          className="flex-1 hover:bg-green-600 transition duration-300 ease-in-out font-sans font-medium bg-green-400 p-2 rounded-[.7em] text-white"
          onClick={onContinue}
        >
          Seguir agregando
        </button>
        <button
          className="flex-1 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out font-sans font-medium p-2 rounded-[.7em] text-black"
          onClick={onViewTable}
        >
          Ver tabla
        </button>
      </div>
    </div>
  );
  export default SuccessDisplay;