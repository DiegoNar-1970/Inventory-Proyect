import { EX_HOUR } from "../const/TYPES_HOURS.js";
import { initHourType } from '../const/const.js';

import {
    COMMISION_NIGHT_HOLIDAY,
    COMMISION_NIGHT_OVERTIME,
    EH_DAYTIME_HOLIDAY,
    EH_DAYTIME_OVERTIME,
    EH_NIGHT_HOLIDAY,
    EH_NIGHT_OVERTIME
} from '../const/payForHour.js';

export const calcComissions = (news) => {
    
    let dayTimeOvertime = initHourType();
    let nightOvertime = initHourType();
    let dayTimeHoliday = initHourType();
    let nightHoliday = initHourType();
    let paiForComissions = 0;

    const processExtraHour = (hourType, rate, comissionRate = 0, value) => {
        hourType.totalHours += value.calcHoursTotal;
        hourType.typeHour = value._id.extraHours;
        hourType.paiForHour += hourType.totalHours * rate;
        hourType.hrsComission += value.calcHoursTotal;
        if (comissionRate) {
            hourType.paiForComissions += value.calcHoursTotal * comissionRate;
            paiForComissions += hourType.paiForComissions;
            paiForComissions += value.calcHoursTotal * comissionRate;
        }
        paiForComissions += hourType.paiForHour;
        if (value._id.comissions !== "NO_APLICA") {
            hourType.comissions=value._id.comissions;
        }
    };

    Object.entries(news.news).forEach(([key, value]) => {
        switch (value._id?.extraHours) {
            case EX_HOUR.DAYTIME_OVERTIME:
                processExtraHour(dayTimeOvertime, EH_DAYTIME_OVERTIME, 0, value);
                break;
            case EX_HOUR.NIGHT_OVERTIME:
                processExtraHour(nightOvertime, EH_NIGHT_OVERTIME, COMMISION_NIGHT_OVERTIME, value);
                break;
            case EX_HOUR.DAYTIME_HOLIDAY:
                processExtraHour(dayTimeHoliday, EH_DAYTIME_HOLIDAY, 0, value);
                break;
            case EX_HOUR.NIGHT_HOLIDAY:
                processExtraHour(nightHoliday, EH_NIGHT_HOLIDAY, COMMISION_NIGHT_HOLIDAY, value);
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