import { formatedDate } from "../../helpers/formateDate";
import ExtraHour from "./ExtraHour";
import HrsComission from "./HrsComission";

const InfoPaiment = ({ info, startDate, endDate }) => {
  console.log(info);
  return (
    <section className="border-b-[2px] border-t-[2px] gap-4 flex flex-col">
      <article className="flex flex-col text-center gap-2 ">
        <h1> FRUTY GREEN PACKING SAS </h1>
        <div>
          <span>Nit:</span> <span>{info.nit}</span>
        </div>
        <div className="flex gap-2 flex-col">
          <div>
            <span> Nomina # </span> <span> {info.numberNomina}</span>
            <span>Correspondiente al perioodo del </span>
          </div>
          <span>
            {formatedDate(startDate)} al {formatedDate(endDate)}
          </span>
        </div>
      </article>
      <article className="border-t-[2px] border-blue-900 p-2  ">
        <div className="flex justify-between mb-2 ">
          <span className="border-b-[2px] border-blue-900">
            {info.employee.profile.name.toUpperCase()}
            {info.employee.profile.lastName.toUpperCase()}
          </span>
          <div className="flex gap-6 ">
            <span className="border-b-[2px] border-blue-900">CC</span>
            <span className="border-b-[2px] border-blue-900">
              {info.employee.profile.cc}
            </span>
          </div>
        </div>
        <div className="flex justify-between ">
          <div>
            <span className="font-sans font-semibold">Cargo:</span>
            <span> {info.employee.area}</span>
          </div>
          <div className="flex gap-6">
            <span className="font-sans font-semibold">Sueldo Basico:</span>
            <span> {info.employee.baseSalary}</span>
          </div>
        </div>
        <div className="flex justify-between ">
          <span className="font-sans font-semibold">Sueldo:</span>
          <div className="flex justify-between min-w-[260px]">
            <span>{info.totalHrs.toFixed(1)}</span>
            <span>{(info.employee.baseSalary / 184).toFixed(1)}</span>
            <span>{info.employee.baseSalary / 2}</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex justify-between ">
          <span>Auxilio de Transporte</span>
          <div className="flex justify-between min-w-[260px] ">
            <span>{info.totalHrs.toFixed(1)}</span>
            <span>{info.auxTransportHrs.toFixed(1)}</span>
            <span>{info.auxTransportPai.toFixed(1)}</span>
            <span>0</span>
          </div>
        </div>
        {info.dayTimeOvertime === null ? (
          ""
        ) : (
          <ExtraHour extraHrs={info.dayTimeOvertime} />
        )}
        {info.dayTimeHoliday === null ? (
          ""
        ) : (
          <ExtraHour extraHrs={info.dayTimeHoliday} />
        )}
        {info.nightHoliday === null ? (
          ""
        ) : (
          <ExtraHour extraHrs={info.nightHoliday} />
        )}
        {info.nightOvertime === null ? (
          ""
        ) : (
          <ExtraHour extraHrs={info.nightOvertime} />
        )}
        {info.paiNigthDominicalShift === null ? ''
        : <HrsComission info={info.paiNigthDominicalShift} />}

        {info.paiNigthShift === null ? ''
        : <HrsComission info={info.paiNigthShift} />}
      </article>
    </section>
  );
};

export default InfoPaiment;
