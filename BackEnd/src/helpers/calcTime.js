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
      percentage: 0,
    };
    let recargos = {
      type: 'NO_APLICA',
      apply: false,
      value: 0,
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
          horasExtras.percentage = 1.25;
          break;

        case TYPE_SHIFT.NIGHT_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          horasExtras.percentage = 1.75;
          recargos = calculateNightShiftRecargos(checkTime, hours, horasExtras.hours);
          break;

        case TYPE_SHIFT.DOMINICAL_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          horasExtras.percentage = 2;
          recargos = calculateSundayRecargos(hours, minutes, horasExtras);
          break;

        case TYPE_SHIFT.NIGH_DOMINICAL_SHIFT:
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          horasExtras.percentage = 2.5;
          recargos = calculateNightSundayRecargos(checkTime, hours, horasExtras.hours);
          break;
      }
    } else {
      recargos = applyRecargosWithoutExtras(typeHour, checkTime, hours, minutes);
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


const calculateNightShiftRecargos = (checkTime, hours, extraHours) => {
  let recargos = {
    type: COMISSIONS.NIGHT_SURCHARGE,
    apply: true,
    value: 0.35,
    hrs: adjustHoursForNightShift(checkTime, hours, extraHours),
  };
  return recargos;
};

const calculateSundayRecargos = (hours, minutes, horasExtras) => ({
  type: COMISSIONS.SUNDAY,
  apply: true,
  value: 0.75,
  hrs: (hours + horasExtras.hours) + (horasExtras.minutes / 60),
});

const calculateNightSundayRecargos = (checkTime, hours, extraHours) => ({
  type: COMISSIONS.SUNDAY_NIGHT,
  apply: true,
  value: 1.1,
  hrs: adjustHoursForNightShift(checkTime, hours, extraHours),
});

const applyRecargosWithoutExtras = (typeHour, checkTime, hours, minutes) => {
  let recargos = {
    type: 'NO_APLICA',
    apply: false,
    value: 0,
    hrs: 0,
  };

  if (typeHour === TYPE_SHIFT.NIGHT_SHIFT || typeHour === TYPE_SHIFT.NIGH_DOMINICAL_SHIFT) {
    recargos.type = typeHour === TYPE_SHIFT.NIGHT_SHIFT ? COMISSIONS.NIGHT_SURCHARGE : COMISSIONS.SUNDAY_NIGHT;
    recargos.apply = true;
    recargos.value = typeHour === TYPE_SHIFT.NIGHT_SHIFT ? 0.35 : 1.1;
    recargos.hrs = adjustHoursForNightShift(checkTime, hours, 0);
  } else if (typeHour === TYPE_SHIFT.DOMINICAL_SHIFT) {
    recargos.type = COMISSIONS.SUNDAY;
    recargos.apply = true;
    recargos.value = 0.75;
    recargos.hrs = hours + (minutes / 60);
  }

  return recargos;
};

const adjustHoursForNightShift = (checkTime, hours, extraHours) => {
  const startHour = checkTime.getHours();
  if (startHour === 17) return hours - 3 + extraHours;
  if (startHour === 18) return hours - 2 + extraHours;
  if (startHour === 19) return hours - 1 + extraHours;
  return hours + extraHours;
};