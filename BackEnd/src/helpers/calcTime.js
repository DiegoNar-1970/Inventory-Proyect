import { COMISSIONS, TYPE_SHIFT } from '../const/TYPES_HOURS.js';
export const calcTime=(initialDate,endDate,breakfast,lunch,typeHour)=>{
    const checkTime=new Date(initialDate);
    const leaveWork=new Date(endDate);
    let deadMin=0
    let totalMinHour=0
    let hours=0
    let minutes=0
    let horasExtras={
      type:'NO_APLICA',
      hours:0,
      minutes:0,
      percentage:0,
    }
    let recargos={
      type:'NO_APLICA',
      apply:false,
      value:0
    }

    if(checkTime.getMinutes() >= 45 && checkTime.getMinutes() <= 59){
       totalMinHour=Math.abs(checkTime.getHours()-leaveWork.getHours())-1; //math.abs obtiene el valor absoluto
       deadMin=60-checkTime.getMinutes()
       totalMinHour=totalMinHour*60
       totalMinHour=totalMinHour+deadMin;
    }
    else{
      totalMinHour=Math.abs(checkTime.getHours()-leaveWork.getHours());
      deadMin=checkTime.getMinutes();
      totalMinHour=totalMinHour*60;
      totalMinHour=totalMinHour-deadMin;
    }

    totalMinHour=totalMinHour+leaveWork.getMinutes();

    if(breakfast)totalMinHour=totalMinHour-30;
    
    if(lunch)totalMinHour=totalMinHour-40;

    (()=>{
       hours=Math.floor(totalMinHour/60)
       minutes=totalMinHour%60;
    })();

    if (typeHour === TYPE_SHIFT.DAY_SHIFT) {
      if (hours > 8) {
          horasExtras.hours = hours - 8;
          hours=hours-horasExtras.hours
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          horasExtras.minutes = minutes;
          horasExtras.percentage = 1.25
          minutes = 0;
      }}
      if (typeHour === TYPE_SHIFT.NIGHT_SHIFT) {
        if (hours > 8) {
            horasExtras.hours = hours - 8;
            hours=hours-horasExtras.hours
            horasExtras.type = `HORA_EXTRA_${typeHour}`;
            horasExtras.minutes = minutes;
            horasExtras.percentage = 1.75  
            recargos.type = COMISSIONS.NIGHT_SURCHARGE;
            recargos.apply = true;
            recargos.value=0.35
            minutes = 0;
        }
        else{
          recargos.type = COMISSIONS.NIGHT_SURCHARGE;
          recargos.apply = true;
          recargos.value=0.35
        }
      }
        if (typeHour === TYPE_SHIFT.DOMINICAL_SHIFT) {
          if (hours > 8) {
              horasExtras.hours = hours - 8;
              hours=hours-horasExtras.hours
              horasExtras.type = `HORA_EXTRA_${typeHour}`;
              horasExtras.minutes = minutes;
              horasExtras.percentage = 2 
              recargos.type = COMISSIONS.SUNDAY;
              recargos.apply = true;
              minutes = 0;
          }
        else{
              recargos.type = COMISSIONS.SUNDAY;
              recargos.apply = true;
              recargos.value=0.75
        }}
        if (typeHour === TYPE_SHIFT.NIGH_DOMINICAL_SHIFT) {
          if (hours > 8) {
              horasExtras.hours = hours - 8;
              horasExtras.type = `HORA_EXTRA_${typeHour}`;
              horasExtras.minutes = minutes;
              horasExtras.percentage = 2.5 
              recargos.type = COMISSIONS.SUNDAY_NIGHT;
              recargos.apply = true;
              minutes = 0;
              hours=hours-horasExtras.hours
          }
        else{
              recargos.type = COMISSIONS.SUNDAY_NIGHT;
              recargos.apply = true;
              recargos.value= 1.1
        }}

    return {
      hours,
      minutes,
      checkTime,
      leaveWork,
      horasExtras,
      recargos
    }
}