import { PDFDownloadLink } from "@react-pdf/renderer";
import { formatedDate } from "../../helpers/formateDate";
import ExtraHour from "./ExtraHour";
import HrsComission from "./HrsComission";
import InfoPaimentPdf from "./InfoPaimentPDF";

const InfoPaiment = ({ info, startDate, endDate }) => {
  return (
    <section className="border-t-2 border-b-2 border-gray-400 flex flex-col min-w-[700px] mx-auto text-sm">
      {/* Header */}
      <article className="text-center text-blue-900 font-bold py-2">
        <h1 className="text-lg">FRUTY GREEN PACKING SAS</h1>
        <div>
          <span>Nit:</span> <span>{info.nit}</span>
        </div>
        <div className="mt-2">
          <span>Nómina #</span> <span>{info.numberNomina}</span>
          <span className="ml-1"> correspondiente al periodo del </span>
          <span>
            {formatedDate(startDate)} al {formatedDate(endDate)}
          </span>
        </div>
      </article>

      {/* Employee Info */}
      <article className="border-t-2 border-blue-900 p-2">
        <div className="flex justify-between">
          <span className="font-semibold underline">
            {info.employee.profile.name.toUpperCase()}{" "}
            {info.employee.profile.lastName.toUpperCase()}
          </span>
          <div className="flex gap-6">
            <span className="underline">CC</span>
            <span className="underline">{info.employee.profile.cc}</span>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <span className="font-semibold">Cargo:</span>
            <span>{info.employee.area}</span>
          </div>
          <div className="flex gap-6">
            <span className="font-semibold">Sueldo Básico:</span>
            <span>{info.employee.baseSalary}</span>
          </div>
        </div>
      </article>

      {/* Payment Details */}
      <article className="border-b-2 border-blue-900 p-2">
        <div className="flex justify-between">
          <span>Sueldo</span>
          <div className="flex justify-between min-w-[260px]">
            <span>{info.totalHrs.toFixed(1)}</span>
            <span>{(info.employee.baseSalary / 184).toFixed(1)}</span>
            <span>{info.employee.baseSalary / 2}</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Auxilio de Transporte</span>
          <div className="flex justify-between min-w-[260px]">
            <span>{info.totalHrs.toFixed(1)}</span>
            <span>{info.auxTransportHrs.toFixed(1)}</span>
            <span>{info.auxTransportPai.toFixed(1)}</span>
            <span>0</span>
          </div>
        </div>

        {/* Extra Hours and Commissions */}
        {info.dayTimeOvertime && <ExtraHour extraHrs={info.dayTimeOvertime} />}
        {info.dayTimeHoliday && <ExtraHour extraHrs={info.dayTimeHoliday} />}
        {info.nightHoliday && <ExtraHour extraHrs={info.nightHoliday} />}
        {info.nightOvertime && <ExtraHour extraHrs={info.nightOvertime} />}
        {info.paiNigthDominicalShift && (
          <HrsComission info={info.paiNigthDominicalShift} />
        )}
        {info.paiNigthShift && <HrsComission info={info.paiNigthShift} />}

        <div className="flex justify-between">
          <span>Aportes Pensión Trabajador</span>
          <div className="flex justify-between min-w-[260px]">
            <span>0</span>
            <span>{info.deducctions.pension}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Aportes Salud Trabajador</span>
          <div className="flex justify-between min-w-[260px]">
            <span>0</span>
            <span>{info.deducctions.salud}</span>
          </div>
        </div>
      </article>

      {/* Final Totals */}
      <article className="p-2">
        <div className="flex justify-between">
          <span className="font-semibold">Firma del Empleado</span>
          <span>____________________</span>
          <div className="flex justify-between gap-12">
            <span className="font-semibold">Total</span>
            <span>{info.totalPaiment}</span>
            <span>
              {(info.deducctions.salud + info.deducctions.pension).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">C.C.</span>
          <div className="flex justify-between gap-12">
            <span className="font-semibold">Neto Pagado</span>
            <span>{info.paiOutDeductions.toFixed(2)}</span>
          </div>
        </div>
      </article>
      <PDFDownloadLink
        document={
          <InfoPaimentPdf info={info} startDate={startDate} endDate={endDate} />
        }
        fileName={`DesprendiblePago#${info.employee.profile.lastName}`}
        className="w-full flex justify-center mt-[11px] mb-[20px] "
      >
        {({ loading, url, error, blob }) => 
          loading ? (
            <button
              className="p-3 text-[20px] bg-black rounded-[.8em] 
         text-white shadow-md shadow-gray-700 hover:shadow-lg hover:shadow-gray-700 
         transition duration-300 ease-in-out"
            >
              Cargando...
            </button>
          ) : (
            <button
              className="p-3 text-[20px] bg-black rounded-[.8em] 
         text-white shadow-md shadow-gray-700 hover:shadow-lg hover:shadow-gray-700 
         transition duration-300 ease-in-out
          "
            >
              Descargar En Pdf
            </button>
          )
        }
      </PDFDownloadLink>
    </section>
  );
};

export default InfoPaiment;
