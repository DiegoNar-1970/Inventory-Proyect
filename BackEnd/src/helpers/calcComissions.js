import { EX_HOUR } from "../const/TYPES_HOURS.js";
import { initHourType } from '../const/const.js';

import {
    PEH_DAYTIME_HOLIDAY,
    PEH_DAYTIME_OVERTIME,
    PEH_NIGHT_HOLIDAY,
    PEH_NIGHT_OVERTIME
} from '../const/payForHour.js';

export const calcComissions = (news,baseSalary) => {
    console.log('news', news);
    let dayTimeOvertime = null;
    let nightOvertime = null;
    let dayTimeHoliday = null;
    let nightHoliday = null;
    let paiForComissions = 0;

    const processExtraHour = (hourType, porcentageComission, baseSalary ,value) => {
        hourType.totalHours = value.calcHoursTotal;
        hourType.typeHour = value._id.extraHours;
        hourType.comissions = value._id?.comissions;
        hourType.paiExtraForHour = porcentageComission * baseSalary;
        hourType.paiOfHours = value.calcHoursTotal * ((baseSalary * porcentageComission) + baseSalary);
        hourType.paiForHourComission = (baseSalary * porcentageComission) + baseSalary;
        return hourType.paiOfHours;
    };

    Object.entries(news).forEach(([key, value]) => {
        switch (value._id?.extraHours) {
            case EX_HOUR.DAYTIME_OVERTIME:
                dayTimeOvertime = dayTimeHoliday || initHourType();
                paiForComissions += processExtraHour(dayTimeOvertime, PEH_DAYTIME_OVERTIME,baseSalary,value);
                break;
            case EX_HOUR.NIGHT_OVERTIME:
                nightOvertime= nightOvertime || initHourType();
                paiForComissions += processExtraHour(nightOvertime, PEH_NIGHT_OVERTIME,baseSalary, value);
                break;
            case EX_HOUR.DAYTIME_HOLIDAY:
                dayTimeHoliday = dayTimeHoliday || initHourType();
                paiForComissions += processExtraHour(dayTimeHoliday, PEH_DAYTIME_HOLIDAY,baseSalary ,value);
                break;
            case EX_HOUR.NIGHT_HOLIDAY:
                nightHoliday= nightHoliday || initHourType();
                paiForComissions += processExtraHour(nightHoliday, PEH_NIGHT_HOLIDAY,baseSalary,value);
                break;
        }
    });
    return {
        dayTimeOvertime,
        nightOvertime ,
        dayTimeHoliday,
        nightHoliday,
        paiForComissions
    };
};