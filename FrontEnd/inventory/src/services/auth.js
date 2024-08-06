    import axios from './axios.js';

    export const login=(url,user)=> axios.post(url,user)        

    export const verifyToken=(url)=> axios(url);        

    export const logout=(url)=> axios.get(url);
    
    export const createProfile=(url,profile)=> axios.post(url,profile);
    
    export const createEmployee=(url,employee)=> axios.post(url,employee);
