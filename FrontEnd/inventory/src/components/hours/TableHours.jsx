
import { useParams } from "react-router-dom";
import Search from "../smallComponents/Search";
import  {UseBodyFetch} from '../../helpers/UseFetch'


const TableHours = () => {

    let {area}=useParams();

    const datos={
      startDate:"2024/01/01",
      endDate:"2024/01/02",
      startWeek:1,
      endWeek:2
  }
  
    const {data}=UseBodyFetch(`http://localhost:3000/workHour/?area=${area}`,area,datos);
  console.log(data)

  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
          <Search/>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
          <button onClick={()=>''/*hours(filterData)*/ }>see</button>
      </article>
    </div>
  )
}

export default TableHours