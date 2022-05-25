import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{


  return (
    <ProjectsContext.Provider
      value={{

      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsProvider}


export default ProjectsContext;