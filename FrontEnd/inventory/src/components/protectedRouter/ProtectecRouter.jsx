import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const ProtectecRouter = () => {
  const {fetchLogin,error,user,isAuthenticated}=useContext(AuthContext);
  console.log(user)
  return (
    <div>
        ProtectedRouter
    </div>
  )
}

export default ProtectecRouter