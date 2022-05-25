import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{
  const [projects, setprojects] = useState([]);
  const [alert, setAlert] = useState([])

  const showAlert = alert=>{
    setAlert(alert)

    setTimeout(()=>{
      setAlert({})
    },5000)
  }

  const postProject=async project=>{
    console.log(project)
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