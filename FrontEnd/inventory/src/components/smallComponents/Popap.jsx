import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import InfoPaiment from '../paiment/InfoPaiment.jsx';

export const Popap = ({ see, changeSee, component: Component, optional }) => {
  const [loading, setLoading] = useState({
    component: "component",
    message: "",
  });
  const [infoPaiment, setInfoPaiment] = useState(null);
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
    
      className={`fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-center transition-opacity duration-300 ease-in-out 
        ${ isOpen ? "opacity-100" : "opacity-0"}`}>

      <article
        className={`bg-[#ffffff0b] p-2  rounded-[1em] flex flex-col text-black min-w-[450px]  transition-transform duration-300 ease-in-out 
          ${isOpen ? "transform scale-100" : "transform scale-90"}`}>
        <div className="bg-white p-2 rounded-[1em]">
          <div className="flex justify-end text-[30px] w-full hover:text-red-600 transition-all ">
            <button onClick={changeSee} >
              <IoCloseOutline  />
            </button>
          </div>
          <div className="p-4">

            {loading.component === "component" && (
              <Component
                item={see}
                setLoading={setLoading}
                optional={optional}
                setInfoPaiment={setInfoPaiment}
              />
            )}
            {loading.component === "loading" && <div className="loader"></div>}
            {loading.component === "infoPaiment" &&
              <InfoPaiment 
                info={infoPaiment.paiment.newInfoPaiment}
                startDate={infoPaiment.startDate}
                endDate={infoPaiment.endDate}
              /> 
            }
          </div>
          <div className="w-[100%] pr-4 pl-4 ">
            <button
              onClick={changeSee}
              className="w-[100%] p-2 rounded-[17px] font-sans hover:bg-black hover:text-white transition-all mb-[16px]  "
            >
              Cerrar 
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
