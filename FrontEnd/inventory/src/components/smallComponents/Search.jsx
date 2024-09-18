import { IoPersonAddOutline, IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <>
        <div className="flex gap-2 items-center bg-gray-500 rounded-2xl ">
          <input className="rounded-2xl outline-none  p-[6px]
          rounded-r-none text-black" 
          placeholder="nombre" type="search" />
          <button className=" text-white min-w-[30px] h-full mr-[10px]">
            <IoSearch className="text-[30px]"/>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <IoPersonAddOutline className="text-[30px] text-green-500" />
          <button>Regitrar Personal</button>
        </div>
        <div>
        </div>
    </>
  )
}

export default Search