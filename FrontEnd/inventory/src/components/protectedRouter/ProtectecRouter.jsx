import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Navigate,Outlet} from 'react-router-dom'

const ProtectecRouter = () => {
  const {isAuthenticated,isLoading}=useContext(AuthContext);

  if(isLoading) return <h1>Loading...</h1> 
  
  if(!isLoading && !isAuthenticated) return <Navigate to='/login' replace />
  return <Outlet/>
}

export default ProtectecRouter