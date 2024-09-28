
import { typePaiment } from "../const/const.js";
import { P_DOMINICAL_SHIFT, P_NIGH_DOMINICAL_SHIFT, P_NIGHT_SHIFT } from "../const/payForHour.js";
import { TYPE_SHIFT } from "../const/TYPES_HOURS.js";

export const calcPaiment = (workHour,baseSalary) => {
    
    let paiDayShift = typePaiment();
    let paiNigthShift = typePaiment();
    let paiDominicalShift = typePaiment();
    let paiNigthDominicalShift = typePaiment();
    let totalPaiment=0;

    const processPaiment = (hourType,baseSalary,porcentage=0,totalPaiment,value) => {
        let valuePai=0
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
                totalPaiment += processPaiment(paiDayShift, baseSalary, 0, totalPaiment ,value);
                break;
            case TYPE_SHIFT.NIGHT_SHIFT:
                totalPaiment += processPaiment(paiNigthShift,baseSalary, P_NIGHT_SHIFT, totalPaiment, value);
                break;
            case TYPE_SHIFT.DOMINICAL_SHIFT:
                totalPaiment += processPaiment(paiDominicalShift,baseSalary, P_DOMINICAL_SHIFT, totalPaiment, value);
                break;
            case TYPE_SHIFT.NIGH_DOMINICAL_SHIFT:
                totalPaiment += processPaiment(paiNigthDominicalShift,baseSalary, P_NIGH_DOMINICAL_SHIFT, totalPaiment, value);
                break;
        }
    });

    return {
        paiDayShift,
        paiNigthShift,
        paiDominicalShift,
        paiNigthDominicalShift,
        totalPaiment,
    };
};