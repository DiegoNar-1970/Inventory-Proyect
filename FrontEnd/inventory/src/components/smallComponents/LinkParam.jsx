import { Link} from "react-router-dom";
const LinkParam = ({icon:Icon,url,area}) => {
  return (
    <>
        <div className="min-w-[100px] w-[450px] min-h-[50px] h-[50px] 
      bg-slate-100 relative rounded-[1em] text-[1.1em] hover:bg-gray-500
      text-black shadow-md shadow-fondo-menu transition-all">
        <Link to={`/${url}/${area}`} className="h-full w-full flex justify-center items-center gap-4">
          <Icon  className="text-[30px]"/>
          <span>Registro empleados</span>
        </Link>
      </div>
    </>
  )
}

export default LinkParam