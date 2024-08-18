export const calcTime=(initialDate,endDate,breakfast,lunch,inputDate)=>{
    const checkTime=new Date(initialDate);
    const leaveWork=new Date(endDate);
    const creationDate=new Date(inputDate);

    let deadMin=0
    let totalMinHour=0
    let hours=0
    let minutes=0

    if(checkTime.getMinutes() >= 45 && checkTime.getMinutes() <= 59){
       totalMinHour=Math.abs(checkTime.getHours()-leaveWork.getHours())-1;
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
    
    return {
      hours,
      minutes,
      checkTime,
      leaveWork,
      creationDate
    }
}