import { createContext,useEffect,useState } from "react";
import {login,verifyToken} from '../services/auth.js'
import Cookies from 'js-cookie'
import { logout } from "../services/auth.js";

export const AuthContext=createContext();

export function AuthProvider({children}){

    const [user,setUser]=useState(null);
    const [error,setError]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [isLoading,setIsLoading]=useState(true);

    const fetchLogin=async(url,formLogin)=>{
        try{
            const result=await login(url,formLogin);
            setUser(result.data);
            setIsAuthenticated(true);
        }catch(err){
            console.log(err.response.data.message)
            setError(err.response.data.message)
        }
        
    }

    useEffect(()=>{
            setUser(null);
            setIsAuthenticated(false)
            setIsLoading(false);
        async function checkLogin (){
            const cookie = Cookies.get();
            console.log('cookie',cookie);

            if(!cookie.token){
               setIsAuthenticated(false);
               setIsLoading(false)
               return setUser(null)
            }
            try{
                const res = await verifyToken('verify',cookie.token)
                console.log('respuesta',res)
                if(!res.data){
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setIsLoading(false);
                setUser(res.data)
            }catch(err){
                setIsAuthenticated(false);
                setUser(null);
                setIsLoading(false);
            }
        }
        checkLogin();
    },[])

    const reqLogut=async(url)=>{
        try {
            const result= await logout(url);

            setUser(null);
            setError(null)
            setIsAuthenticated(false)

            setIsLoading(false);

            Cookies.remove('token');
            
            console.log(result);
          } catch (error) {
            console.error('Error during logout:', error);
          }

    }
    return (
        <AuthContext.Provider value={{
            fetchLogin,
            user,
            error,
            isAuthenticated,
            isLoading,
            reqLogut
        }}>
            {children}
        </AuthContext.Provider>
    )
}