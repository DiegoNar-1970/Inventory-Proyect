import axios from './axios.js'

export const login=(url,user)=> axios.post(url,user)        
