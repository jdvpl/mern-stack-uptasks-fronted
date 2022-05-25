import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{
  const [projects, setprojects] = useState([]);
  const [alert, setAlert] = useState([])
  const navigate=useNavigate();

  const showAlert = alert=>{
    setAlert(alert)

    setTimeout(()=>{
      setAlert({})
    },5000)
  }

  const postProject=async project=>{
    try {
      const token=localStorage.getItem('token');
      if(!token) return;
      const config ={
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }


      const {data}=await clienteAxios.post('/projects',project,config);
      setAlert({
        msg:data.msg,
        error:false
      })
      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      },3000)
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
    }
  }
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        postProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsProvider}


export default ProjectsContext;