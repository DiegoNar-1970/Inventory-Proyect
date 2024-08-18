export const formatedDate=((date)=>{
    //primero se comvierte a un obeto Date
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');
})
export const formatedDateLocal = (date) => {
    const newDate = new Date(date);
  
    // Obtiene el año, mes, día, hora y minutos
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }