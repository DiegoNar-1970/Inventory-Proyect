import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export const Popap = ({see,changeSee,component:Component}) => {
  const [loading,setLoading]=useState({
    component:'component',
    message:''
  })

console.log(loading.component )

  return (
    <section className="fixed top-0 left-0 h-screen w-screen bg-[#ffffff41] z-10 flex items-center justify-start ">
      <article className=" m-auto p-auto bg-gray-200 p-2 rounded-lg flex flex-col  text-black min-w-[300px] max-w-[430px] ">
        <div className="bg-white p-2 rounded-[1em] ">
          <div className="self-end text-[30px]">
            <button onClick={changeSee}>
              <IoCloseOutline />
            </button>
          </div>
          <div>
            {loading.component === 'component' && <Component item={see} setLoading={setLoading} ></Component>}
            {loading.component === 'loading' && <div className="loader"></div>}
            {loading.component === 'message' 
             && <div className="flex gap-4 flex-col justify-between text-center">
                  <h1 className="font-sans text-[20px] text-black" > {loading.message}  </h1>
                  <button onClick={() => setLoading({ component:'component' , message: '' })}
                    className=" text-white bg-black hover:bg-gray-700 rounded-[.7em] p-1 mb-[-10px]"> Volver
                  </button> 
                </div>

            }   
          </div>      
          
          <div className="w-[100%] mt-[10px]">
            <button
              onClick={changeSee}
              className="mt-2 w-[100%] bg-red-500 text-white p-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
