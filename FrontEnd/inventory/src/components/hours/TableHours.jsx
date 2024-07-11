
import { useParams } from "react-router-dom";
import Search from "../smallComponents/Search";
import { useEffect,useState } from "react";
import  {fetchData} from '../../helpers/fetchData.js'

const apiData=fetchData('http://localhost:3000/workHour');
const TableHours = () => {

    let {area}=useParams();
    const data= apiData.read();
    const [filterData,setFilterData]=useState();

    useEffect(()=>{
      try{
        let dataFilter=data.filter(data=>data.employee.area===area);
        let groupData=Object.groupBy(dataFilter,(employee)=>{
            return employee.employee.profile.name
        })
        setFilterData(groupData);
    }catch(err){
        return(
            <span>Not Found</span>
        )
    }
},[area]);
 
const hours = (data) => {
    let result={}
    Object.keys(data).forEach(key => {
    const totalHours=data[key].reduce((total,item)=>{
        return total + (item.dayHour !== undefined ? item.dayHour : 0);

        },0)
        result[key]=totalHours
        
    });
    console.log(result)
  }
  return (
    <div className="flex flex-col flex-wrap flex-1 rounded-lg gap-3 text-white">
      <article className="flex gap-2 justify-around items-center bg-fondo-menu rounded-lg p-2 box-border  ">
          <Search/>
      </article>
      <article className="flex flex-col bg-fondo-menu rounded-lg box-border p-2 justify-center">
          <button onClick={()=>hours(filterData)}>see</button>
      </article>
    </div>
  )
}

export default TableHours