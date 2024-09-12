import { formatedDate } from "../../helpers/formateDate";
import { newFormatComission, newFormatHour } from "../../helpers/formatsHours";
import img from "../../media/img/img.png";
const SeeTotalHours = ({ item, optional }) => {
  console.log("item", optional);
  const id = item ? item.employee.profile.cc : "";
  const totalHours = optional ? optional[id].totalHours : "";
  const news = optional ? optional[id].info : "";

  console.log("esats son las news", news);


  const allNewsAreNull = news.every((item) => item.news === null);

  return (
    <section className="flex flex-col gap-2">
      <article className="flex gap-4 justify-between">
        <article className="flex gap-2 text-[18px] flex-col">
          <div className="flex flex-col gap-1">
            <span className="text-[15px]">
              {item.employee.profile.name} {item.employee.profile.lastName}
            </span>
            <span className="text-[15px]">{item.employee.profile.cc}</span>
          </div>
          <div>
            <span className="font-semibold font-sans"> Tiene: </span>
            <span className="font-semibold font-sans"> {totalHours}</span>
            <span className="font-semibold font-sans"> Horas acumuladas </span>
          </div>
        </article>
        <img
          className="self-center w-[100px] rounded-full h-[100px]"
          src={img}
          alt={`${item.employee.profile.name}`}
        />
      </article>
      <article className="flex flex-col gap-2 text-[18px] mt-[20px]">
        <h2 className= "font-semibold font-sans" >Novedades</h2>
        {allNewsAreNull ? (
          <h1 className="text-center m-2 font-semibold font-sans text-red-500">No tiene registros de novedades</h1>
        ) : (
          <table className="text-left text-[17px] border-collapse rounded-r-lg">
            <thead className="rounded-r-lg">
              <tr className="border-green-500">
                <th>Hora Extra</th>
                <th>Horas</th>
                <th>Recargo</th>
                <th>Fecha</th>
                <th>Semana</th>
              </tr>
            </thead>
            <tbody>
              {news.map((newItem, index) => (
                <tr key={index}>
                  {newItem.news && newItem.news.extraHours && newItem.news.comissions ? (
                    <>
                      <td className="text-[17px] text-red">
                        {newFormatHour(newItem.news.extraHours.type)}
                      </td>
                      <td className="text-[17px] text-center font-sans font-medium ">
                        {newItem.news.extraHours.hours}
                      </td>
                      <td className="text-[17px] text-center font-sans font-medium ">
                        {newFormatComission(newItem.news.comissions.type)}
                      </td>
                      <td className="text-[17px] text-center">
                        {formatedDate(newItem.news.creationDate)}
                      </td>
                      <td className="text-[17px] text-center">
                        {newItem.news.week}
                      </td>
                    </>
                  ) : ''}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>
    </section>
  );
};


export default SeeTotalHours;
