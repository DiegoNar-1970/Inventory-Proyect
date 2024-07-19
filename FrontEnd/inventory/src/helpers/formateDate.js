export const formatedDate=((date)=>{
    //primero se comvierte a un obeto Date
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');
})