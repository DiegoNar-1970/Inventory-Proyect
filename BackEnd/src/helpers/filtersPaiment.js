export function calcPaiment(allObjectHours){
   const normalHour=5.531;
   const exNormalHour=6.915;
   const holidayHour=11.062;
   let exHours=0;
   let PaiHoliday=0;
   let salary=0;
   let basicPaiment=0;

    const filterEmployeeH = allObjectHours.filter(workHour => workHour.employee !== null);
    const {normalHours,hourHolidays}= Object.groupBy(filterEmployeeH,(hours)=>{
       if(hours.holiday === null) return "normalHours"
       return 'hourHolidays'
    });
    const totalNormalHours = normalHours.reduce((sum, workHour) => sum + workHour.dayHour, 0);
    
    let totalHolidayHours = 0;
    hourHolidays.forEach(workHour => {
        workHour.holiday.forEach(holiday => {
            totalHolidayHours += holiday.hrsHoliday;
           });
       });
   if(totalNormalHours > 94 & totalHolidayHours !== 0 ){
           exHours = totalNormalHours - 94 ;
           PaiHoliday=totalHolidayHours * holidayHour
           basicPaiment=94 * normalHour
           salary = (exHours * exNormalHour) + (94 * normalHour) + PaiHoliday;
       }

       if(totalNormalHours < 94 & totalHolidayHours !== 0 ){
           PaiHoliday=totalHolidayHours * holidayHour
           basicPaiment=totalNormalHours * normalHour
           salary = (totalNormalHours * normalHour) + PaiHoliday;
           }

    if(totalNormalHours > 94 & totalHolidayHours === 0 ){
       basicPaiment = 94 * normalHour
       exHours = totalNormalHours - 94 ;
       salary = (exHours * exNormalHour) + (94 * normalHour);
       }

       if(totalNormalHours < 94 & totalHolidayHours === 0 ){
           basicPaiment=totalNormalHours * normalHour
           salary = exHours * normalHour;
       }
       return {
        totalHolidayHours,
        totalNormalHours,
        exHours,
        basicPaiment,
        salary
       }
}