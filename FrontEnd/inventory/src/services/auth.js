    import axios from './axios.js';

    export const login=(url,user)=> axios.post(url,user)        

    export const verifyToken=(url)=> axios(url);        

    export const logout=(url)=> axios.get(url);
    
    export const createProfile=(url,profile)=> axios.post(url,profile);
    
    export const createEmployee=(url,employee)=> axios.post(url,employee);

    export const getEmployees= (url) => axios.get(url);
    
    export const getByIdEmployee= (url) => axios.get(url);
    
    export const deleteEmployee = (url) => axios.delete(url);

    export const creteHour=(url,data)=>axios.post(url,data);