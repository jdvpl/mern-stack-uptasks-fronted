import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{
  const [projects, setprojects] = useState([{name:'saitama',lastName:'genos'}]);

  return (
    <ProjectsContext.Provider
      value={{
        projects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsProvider}


export default ProjectsContext;