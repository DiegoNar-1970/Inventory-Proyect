
import { typePaiment } from "../const/const.js";
import { P_DOMINICAL_SHIFT, P_NIGH_DOMINICAL_SHIFT, P_NIGHT_SHIFT } from "../const/payForHour.js";
import { TYPE_SHIFT } from "../const/TYPES_HOURS.js";

export const calcPaiment = (workHour,baseSalary) => {

    console.log(workHour)   
    let paiDayShift = null;
    let paiNigthShift = null;
    let paiDominicalShift = null;
    let paiNigthDominicalShift = null;
    let totalPaiment=0;
    let hrs={
        hrs:0,
    };
    const processPaiment = (hourType,baseSalary,porcentage=0,totalPaiment,value,hrs) => { 
        hrs.hrs+=value.calcHoursTotal
        hourType.hrs=value.calcHoursTotal;
        hourType.type=value._id;
        if( value._id != TYPE_SHIFT.DAY_SHIFT ){
            hourType.pai = value.calcHoursTotal  * ((baseSalary * porcentage ) + baseSalary);
            return hourType.pai;
            
        }
        hourType.pai=value.calcHoursTotal * baseSalary
        return hourType.pai;
        
    };

    Object.entries(workHour).forEach(([key, value]) => {
        switch (value._id) {
            case TYPE_SHIFT.DAY_SHIFT:
                paiDayShift=paiDayShift || typePaiment();
                totalPaiment += processPaiment(paiDayShift, baseSalary, 0, totalPaiment ,value,hrs);
                break;
            case TYPE_SHIFT.NIGHT_SHIFT:
                paiNigthShift=paiNigthShift || typePaiment();
                totalPaiment += processPaiment(paiNigthShift,baseSalary, P_NIGHT_SHIFT, totalPaiment, value,hrs);
                break;
            case TYPE_SHIFT.DOMINICAL_SHIFT:
                paiDominicalShift=paiDominicalShift || typePaiment();
                totalPaiment += processPaiment(paiDominicalShift,baseSalary, P_DOMINICAL_SHIFT, totalPaiment, value,hrs);
                break;
            case TYPE_SHIFT.NIGH_DOMINICAL_SHIFT:
                paiNigthDominicalShift=paiNigthDominicalShift || typePaiment();
                totalPaiment += processPaiment(paiNigthDominicalShift,baseSalary, P_NIGH_DOMINICAL_SHIFT, totalPaiment, value,hrs);
                break;
        }
    });

    return {
        paiDayShift,
        paiNigthShift,
        paiDominicalShift,
        paiNigthDominicalShift,
        totalPaiment,
        hrs
    };
};