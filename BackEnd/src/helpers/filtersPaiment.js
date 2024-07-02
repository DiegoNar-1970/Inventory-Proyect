export function calcPaiment(allObjectHours){
   const normalHour=5.531;
   const exNormalHour=6.915;
   const holidayHour=11.062;
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
       let exHours = 0;
       let PaiHoliday = totalHolidayHours * holidayHour;
       let basicPaiment = totalNormalHours * normalHour;
       let salary = basicPaiment + PaiHoliday;
   
       if (totalNormalHours > 94) {
           exHours = totalNormalHours - 94;
           basicPaiment = 94 * normalHour;
           salary = basicPaiment + (exHours * exNormalHour) + PaiHoliday;
       }
       return {
        totalHolidayHours,
        totalNormalHours,
        exHours,
        basicPaiment,
        salary
       }
}