import { COMISSIONSC, EX_HOUR, TYPE_SHIFT } from "./typeHours";

export const newFormatHour = (data) => {
    if (data === EX_HOUR.DAYTIME_HOLIDAY) return "Dominical";

    if (data === EX_HOUR.DAYTIME_OVERTIME) return "Diurna";

    if (data === EX_HOUR.NIGHT_HOLIDAY) return "Dominical Nocturna";

    if (data === EX_HOUR.NIGHT_OVERTIME) return "Nocturna";
    
    return "N/A";
  };
  
  export const newFormatComission = (data) => {
    if (data === COMISSIONSC.NIGHT_SURCHARGE) return "Nocturno";
    if (data === COMISSIONSC.SUNDAY) return "Dominical";
    if (data === COMISSIONSC.NIGH_DOMINICAL) return "Dominical Nocturno";
    return 'N/A'
  };

  export const newFormatShift = (data) => {
    if (data === TYPE_SHIFT.DAY_SHIFT) {
      return "Diurno";
    }
    if (data === TYPE_SHIFT.NIGHT_SHIFT) {
      return "Nocturno";
    }
    if (data === TYPE_SHIFT.DOMINICAL_SHIFT) {
      return "Festivo Diurno";
    }
    if (data === TYPE_SHIFT.NIGH_DOMINICAL_SHIFT) {
      return "Festivo Nocturno";
    }
    return 'N/A'
  };