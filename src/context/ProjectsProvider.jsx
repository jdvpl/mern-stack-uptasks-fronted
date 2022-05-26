import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { getTokenHeaders } from '../utils';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{
  const [projects, setprojects] = useState([]);
  const [alert, setAlert] = useState([])
  const navigate=useNavigate();

  useEffect(() => {
    getProjects()
  }, []);

  const showAlert = alert=>{
    setAlert(alert)

    setTimeout(()=>{
      setAlert({})
    },5000)
  }

  const postProject=async project=>{
    try {
      const config =getTokenHeaders();
      const {data}=await clienteAxios.post('/projects',project,config);

      setprojects([...projects,data.project])

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

  const getProjects = async ()=>{
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios('/projects',config);
      setprojects(data.projects)
    } catch (error) {
      console.log(error);
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