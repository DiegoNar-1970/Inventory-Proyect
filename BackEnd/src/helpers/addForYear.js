
import Vacation from '../models/vacations/vacations.js'
import Employee from '../models/employee/employee.js';
const addAnnualVacation = async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
    const employees = await Employee.find({ admissionDate: { $lte: oneYearAgo } });
    if(employees!=undefined||employees!=null){
        for (const employee of employees) {
            const vacationStartDate = new Date().now;
            const vacationEndDate = new Date();
            vacationEndDate.setDate(vacationStartDate.getDate() + 14);
        
            const newVacation = new Vacation({
              employee: employee,
              startDate: vacationStartDate,
              endDate: vacationEndDate,
            });
        
            await newVacation.save();
          }
    }
    
  };

  export default addAnnualVacation;