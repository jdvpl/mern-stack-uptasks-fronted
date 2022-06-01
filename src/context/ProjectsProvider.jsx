import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { getTokenHeaders } from '../utils';


const ProjectsContext =createContext();


const ProjectsProvider=({children})=>{

  const [projects, setprojects] = useState([]);
  const [alert, setAlert] = useState({})
  const [project, setproject] = useState({});
  const [loadingProject, setloadingProject] = useState(false);
  const [modalPopupTaskForm, setmodalTaskForm] = useState(false);
  const [task, settask] = useState({});
  const [deleteModalTask, setdeleteModalTask] = useState(false);

  const navigate=useNavigate();


  const showAlert = alert=>{
    setAlert(alert)

    setTimeout(()=>{
      setAlert({})
    },5000)
  }
  // create project
  const submitProject=async project=>{
    if(project.id){
      await updateProject(project)
    }else{
      await createProject(project)
    }
  }
  const createProject=async (project) => {

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
  const updateProject=async project=>{

    try {
      const config =getTokenHeaders();
      const {data}=await clienteAxios.put(`/projects/${project.id}`,project,config);

      const projectsUpdated=projects.map(projectState=> projectState.uid==data.project.uid?data.project:projectState);

      setprojects(projectsUpdated);

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
  // /get all projects
  const getProjects = async ()=>{
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios('/projects',config);
      setprojects(data.projects)
    } catch (error) {
    }
  }
  // get project
  const getProject = async (id)=>{
    setloadingProject(true);
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios(`/projects/${id}`,config);
      setproject(data);
    } catch (error) {
      console.log(error);
    }finally{
      setloadingProject(false);
    }
  }
  // delete project
  const deleteProject = async (id)=>{
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.delete(`/projects/${id}`,config);
      
      const projectsUpdated=projects.filter(projectState=> projectState.uid !== id);
      setprojects(projectsUpdated)
      setAlert({
        msg:data.msg,
        error:false
      })
      // setproject(data);
      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      },2000)
    } catch (error) {
      console.log(error);
    }
  }

  const handleTaskForm=()=>{
    setmodalTaskForm(!modalPopupTaskForm);
    settask({})
  }

  const submitTask=async task => {

    if (task?.id){
     await updateTask(task);
    }else{
     await createTask(task);
    }
   
  }

  const createTask= async task=>{
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.post(`/tasks`,task,config);
      const projectupdated={...project};
      projectupdated.tasks=[...projectupdated.tasks,data];
      setproject(projectupdated);
      setAlert({})
      setmodalTaskForm(false);
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
    }
  }

  const updateTask=async task => {
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.put(`/tasks/${task.id}`,task,config);
      console.log(data)
      const projectupdated={...project};
      projectupdated.tasks=projectupdated.tasks.map(t => t._id===data._id?data:t);
      setproject(projectupdated);
      setAlert({})
      setmodalTaskForm(false);
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
    }
  }
  const handleEditTaskForm=task=>{
    settask(task);
    setmodalTaskForm(true)
  }

  const handleDeleteTask=task=>{
    settask(task);
    setdeleteModalTask(!deleteModalTask);
  }

  const deleteTask=async () => {
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.delete(`/tasks/${task._id}`,config);
      setAlert({
        msg:data.msg,
        error:false
      })
      const projectupdated={...project};
      projectupdated.tasks=projectupdated.tasks.filter(t=> t._id !== task._id);
      setproject(projectupdated)
      setdeleteModalTask(false);
      settask({})

      setTimeout(()=>{
        setAlert({})
      },3000)
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
    }
  }
  // provider
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loadingProject,
        deleteProject,
        handleTaskForm,
        modalPopupTaskForm,
        submitTask,
        getProjects,
        handleEditTaskForm,
        task,
        handleDeleteTask,
        deleteModalTask,
        deleteTask
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsProvider}


export default ProjectsContext;