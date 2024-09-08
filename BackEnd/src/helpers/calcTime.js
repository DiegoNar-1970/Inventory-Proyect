import { COMISSIONS, TYPE_SHIFT } from '../const/TYPES_HOURS.js';
export const calcTime=(initialDate,endDate,breakfast,lunch,typeHour)=>{
  try{
    const checkTime=new Date(initialDate);
    const leaveWork=new Date(endDate);

    let horasExtras={
      type:'NO_APLICA',
      hours:0,
      minutes:0,
      percentage:0,
    }
    let recargos={
      type:'NO_APLICA',
      apply:false,
      value:0,
      hrs:0
    }
    const differenceInMillis = leaveWork - checkTime;

    let totalMinutes = Math.floor(differenceInMillis / (1000 * 60));

    if(breakfast)totalMinutes=totalMinutes-30;
    
    if(lunch)totalMinutes=totalMinutes-40;

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    console.log('hours', hours);
    console.log('minutes', minutes);

    if (typeHour === TYPE_SHIFT.DAY_SHIFT) {
      if (hours > 8) {
          horasExtras.hours = hours - 8;
          hours=hours-horasExtras.hours
          horasExtras.type = `HORA_EXTRA_${typeHour}`;
          horasExtras.minutes = minutes;
          horasExtras.percentage = 1.25
          minutes = 0;
      }
    }
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
            if(checkTime.getHours() === 17 ) recargos.hrs = hours - 3;
            if(checkTime.getHours() === 18 ) recargos.hrs=hours - 2;
            if(checkTime.getHours() === 19 ) recargos.hrs=hours - 1;
            recargos.hrs = hours ;
        }
        else{
          recargos.type = COMISSIONS.NIGHT_SURCHARGE;
          recargos.apply = true;
          recargos.value=0.35
          if(checkTime.getHours() === 17 )recargos.hrs=hours - 3;
          if(checkTime.getHours() === 18 )recargos.hrs=hours - 2;
          if(checkTime.getHours() === 19 )recargos.hrs=hours - 1;
          recargos.hrs = hours;
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
              recargos.hrs = (hours + horasExtras.hours) + (horasExtras.minutes / 60) ;
          }
        else{
              recargos.type = COMISSIONS.SUNDAY;
              recargos.apply = true;
              recargos.value=0.75
              recargos.hrs = hours + (minutes / 60) ;
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
              hours = hours - horasExtras.hours;
              if(checkTime.getHours() === 17 )recargos.hrs=hours - 3;
              if(checkTime.getHours() === 18 )recargos.hrs=hours - 2;
              if(checkTime.getHours() === 19 )recargos.hrs=hours - 1;
              recargos.hrs = hours ;
          }
        else{
              recargos.type = COMISSIONS.SUNDAY_NIGHT;
              recargos.apply = true;
              recargos.value= 1.1
              if(checkTime.getHours() === 17 )recargos.hrs=hours - 3;
              if(checkTime.getHours() === 18 )recargos.hrs=hours - 2;
              if(checkTime.getHours() === 19 )recargos.hrs=hours - 1;
              recargos.hrs = hours ;
        }}

    return {
      hours,
      minutes,
      checkTime,
      leaveWork,
      horasExtras,
      recargos
    }
  }catch(err){
    console.log(err); 
  }
  
}