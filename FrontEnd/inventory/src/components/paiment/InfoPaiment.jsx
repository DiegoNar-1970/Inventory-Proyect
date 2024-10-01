import { formatedDate } from "../../helpers/formateDate";

const InfoPaiment = ({ info }) => {
  let infoPaiment = info.paiment.newInfoPaiment;
  return (
    <section className="border-b-[2px] border-t-[2px]">
      <div className="flex flex-col text-center gap-2">
        <h1> FRUTY GREEN PACKING SAS </h1>
        <div>
          <span>Nit:</span> <span>{infoPaiment.nit}</span>
        </div>
        <div className="flex gap-2 ">
          <span> Nomina # </span> <span> {infoPaiment.numberNomina}</span>
          <span>Correspondiente al perioodo del </span> 
          <span>
            {formatedDate(info.startDate)} al {formatedDate(info.endDate)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default InfoPaiment;
