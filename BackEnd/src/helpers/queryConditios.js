export function queryCond({startDate,endDate,startWeek,endWeek}){
    const conditions=[];
    //esto puede ser un helpeer
    if(startDate && endDate){
        const newStartDate=new Date(startDate.trim());
        const newsEndDate=new Date(endDate.trim());
        conditions.push({date:{$gte:newStartDate,$lte:newsEndDate}});
    }
    if(startWeek&&endWeek){
        conditions.push({week:{$in:[startWeek,endWeek]}})
    }
    const query= conditions.length ? {$or:conditions} : {};
    return query;
}