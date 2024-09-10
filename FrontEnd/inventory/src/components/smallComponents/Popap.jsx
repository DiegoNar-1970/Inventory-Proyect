import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export const Popap = ({ see, changeSee, component: Component, optional }) => {
  const [loading, setLoading] = useState({
    component: "component",
    message: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (see) {
      setIsOpen(true);
    } else {
      const timer = setTimeout(() => setIsOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [see]);

  return (
    <section
      className={`fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <article
        className={`bg-[#ffffff0b] p-2 rounded-[1em] flex flex-col text-black min-w-[300px] max-w-[600px] transition-transform duration-300 ease-in-out ${
          isOpen ? "transform scale-100" : "transform scale-90"
        }`}
      >
        <div className="bg-white p-2 rounded-[1em]">
          <div className="self-end text-[30px]">
            <button onClick={changeSee}>
              <IoCloseOutline />
            </button>
          </div>
          <div className="p-4">
            {loading.component === "component" && (
              <Component
                item={see}
                setLoading={setLoading}
                optional={optional}
              />
            )}
            {loading.component === "loading" && <div className="loader"></div>}
            {loading.component === "message" && (
              <div className="flex gap-4 flex-col justify-between text-center">
                <h1 className="font-sans text-[20px] text-black">
                  {loading.message}
                </h1>
                <button
                  onClick={() =>
                    setLoading({ component: "component", message: "" })
                  }
                  className="text-white bg-black hover:bg-gray-700 rounded-[.7em] p-1 mb-[-10px]"
                >
                  Volver
                </button>
              </div>
            )}
          </div>
          <div className="w-[100%] mt-[10px] p-4">
            <button
              onClick={changeSee}
              className="mt-2 w-[100%] p-2 rounded font-sans hover:bg-black hover:text-white transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
