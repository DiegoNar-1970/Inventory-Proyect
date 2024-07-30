import { AuthContext } from "../../context/AuthContext.jsx"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

const Logout = () => {
const { reqLogut }=useContext(AuthContext);
const navigate = useNavigate();
const url='/logout'

  const handleLogout = async () => {
    await reqLogut(url);  
    navigate('/login');  
  };
  return (
    <>
        <button onClick={handleLogout}>
          cerrar sesion
        </button>
    </>
  )
}

export default Logout