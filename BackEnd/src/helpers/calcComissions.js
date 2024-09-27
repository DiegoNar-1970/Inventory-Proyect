import { EX_HOUR } from "../const/TYPES_HOURS.js";
import { initHourType } from '../const/const.js';

import {
    PEH_DAYTIME_HOLIDAY,
    PEH_DAYTIME_OVERTIME,
    PEH_NIGHT_HOLIDAY,
    PEH_NIGHT_OVERTIME
} from '../const/payForHour.js';

export const calcComissions = (news,baseSalary) => {
    
    let dayTimeOvertime = initHourType();
    let nightOvertime = initHourType();
    let dayTimeHoliday = initHourType();
    let nightHoliday = initHourType();
    let paiForComissions = 0;

    const processExtraHour = (hourType = initHourType() , porcentageComission, baseSalary ,value) => {
        hourType.totalHours = value.calcHoursTotal;
        hourType.typeHour = value._id.extraHours;
        hourType.comissions = value._id?.comissions;
        hourType.paiForHour = porcentageComission * baseSalary;
        hourType.paiOfHours = value.calcHoursTotal * ((baseSalary * porcentageComission) + baseSalary);
        hourType.paiForHour += value.calcHoursTotal * rate;
    };

    Object.entries(news.news).forEach(([key, value]) => {
        switch (value._id?.extraHours) {
            case EX_HOUR.DAYTIME_OVERTIME:
                paiForComissions += processExtraHour(dayTimeOvertime, PEH_DAYTIME_OVERTIME,baseSalary,value);
                break;
            case EX_HOUR.NIGHT_OVERTIME:
                paiForComissions += processExtraHour(nightOvertime, PEH_NIGHT_OVERTIME,baseSalary, value);
                break;
            case EX_HOUR.DAYTIME_HOLIDAY:
                paiForComissions += processExtraHour(dayTimeHoliday, PEH_DAYTIME_HOLIDAY,baseSalary ,value);
                break;
            case EX_HOUR.NIGHT_HOLIDAY:
                paiForComissions += processExtraHour(nightHoliday, PEH_NIGHT_HOLIDAY,baseSalary,value);
                break;
        }
    });

    return {
        dayTimeOvertime,
        nightOvertime,
        dayTimeHoliday,
        nightHoliday,
        paiForComissions
    };
};