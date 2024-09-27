import { COMISSIONS, TYPE_SHIFT } from '../const/TYPES_HOURS.js';

export const calcTime = (initialDate, endDate, breakfast, lunch, typeHour) => {
  try {
    const checkTime = new Date(initialDate);
    const leaveWork = new Date(endDate);

    const isMondayOrTuesday = [1, 2].includes(checkTime.getDay());
    const standardHours = isMondayOrTuesday ? 7 : 8;

    let horasExtras = {
      type: 'NO_APLICA',
      hours: 0,
      minutes: 0,
    };

    let recargos = {
      type: 'NO_APLICA',
      hrs: 0,
    };

    const differenceInMillis = leaveWork - checkTime;
    let totalMinutes = Math.floor(differenceInMillis / (1000 * 60));

    if (breakfast) totalMinutes -= 30;
    if (lunch) totalMinutes -= 40;

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;


    if (hours > standardHours) {
      horasExtras.hours = hours - standardHours;
      hours = standardHours;
      horasExtras.minutes = minutes;
      minutes = 0;

      switch (typeHour) {
        case TYPE_SHIFT.DAY_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          recargos = calculateTypeOfRecarge(horasExtras,COMISSIONS.COMISSION_DAY_SHIFT);
          break;

        case TYPE_SHIFT.NIGHT_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          recargos = calculateTypeOfRecarge(horasExtras,COMISSIONS.NIGHT_SURCHARGE);
          break;

        case TYPE_SHIFT.DOMINICAL_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          recargos = calculateTypeOfRecarge(horasExtras,COMISSIONS.COMISSION_HOLIDAY_SHIFT);
          break;

        case TYPE_SHIFT.NIGH_DOMINICAL_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          recargos = calculateTypeOfRecarge(horasExtras,COMISSIONS.COMISSION_SUNDAY_NIGHT);
          break;
      }

    } 
    return {
      hours,
      minutes,
      checkTime,
      leaveWork,
      horasExtras,
      recargos
    };
  } catch (err) {
    console.log(err);
  }
};

const calculateTypeOfRecarge = (horasExtras,typeRecarge) => {
  let recargos = {
    type: typeRecarge,
    hrs: horasExtras.hours + (horasExtras.minutes / 60)
  };
  return recargos;
};

const adjustHoursForNightShift = (checkTime, hours, extraHours) => {
  const startHour = checkTime.getHours();
  if (startHour === 17) return hours - 3 + extraHours;
  if (startHour === 18) return hours - 2 + extraHours;
  if (startHour === 19) return hours - 1 + extraHours;
  return hours + extraHours;
};