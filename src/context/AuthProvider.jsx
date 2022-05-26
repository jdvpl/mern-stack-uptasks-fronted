import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';


const AuthContext =createContext();


const AuthProvider=({children})=>{
  const [auth, setauth] = useState({});
  const [loading, setloading] = useState(true);

  const navigate=useNavigate();
  useEffect(() => {
    const token=localStorage.getItem('token');

    if(!token){
      setloading(false);
      return;
    }
    if(token){
      authenticationUser(token);
    }
  }, [])


  const authenticationUser =async(token)=>{

    const config ={
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    }
    try {      
      const {data}=await clienteAxios('/auth/profile',config);
      setauth(data);
      // navigate('/projects')
    } catch (error) {
      setauth({});
    }
    setloading(false);
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        setauth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider}


export default AuthContext;