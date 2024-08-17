export function queryCond({startDate,endDate,startWeek,endWeek}){
    const conditions=[];
    //esto puede ser un helpeer
    if(startDate && endDate){
        const newStartDate = new Date(startDate.trim());
        const newsEndDate = new Date(endDate.trim());
        console.log("newStartDate",newStartDate,"newsEndDate",newsEndDate)  
        if (newStartDate.getTime() === newsEndDate.getTime()) {
            newsEndDate.setHours(23, 59, 59, 999);
        } else {
            newsEndDate.setHours(23, 59, 59, 999);
        }
    
        conditions.push({ creationDate: { $gte: newStartDate, $lte: newsEndDate } });
    }
    if(startWeek&&endWeek){
        conditions.push({week:{$gte:startWeek,$lte:endWeek}})
    }
    const query= conditions.length ? {$and:conditions} : {};
    return query;
}