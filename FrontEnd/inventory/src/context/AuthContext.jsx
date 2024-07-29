import { createContext,useState } from "react";
import {login} from '../services/auth.js'

export const AuthContext=createContext();

export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [error,setError]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    const fetchLogin=async(url,formLogin)=>{
        try{
            const result=await login(url,formLogin);
            setUser(result.data);
            console.log(result)
            setIsAuthenticated(true);
        }catch(err){
            console.log(err.response.data.message)
            setError(err.response.data.message)
        }
        
    }
    return (
        <AuthContext.Provider value={{
            fetchLogin,
            user,
            error,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}