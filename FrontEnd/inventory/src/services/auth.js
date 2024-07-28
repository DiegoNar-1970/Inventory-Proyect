import axios from 'axios'

export const login=(url,user)=>{
    axios.post(url,user);           
}