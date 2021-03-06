import {useState,useEffect,createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { getTokenHeaders } from '../utils';
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth';


let socket;
const ProjectsContext =createContext();
const ProjectsProvider=({children})=>{

  const [projects, setprojects] = useState([]);
  const [alert, setAlert] = useState({})
  const [project, setproject] = useState({});
  const [loadingProject, setloadingProject] = useState(false);
  const [modalPopupTaskForm, setmodalTaskForm] = useState(false);
  const [task, settask] = useState({});
  const [deleteModalTask, setdeleteModalTask] = useState(false);
  const [collaborator, setcollaborator] = useState({})
  const [deleteCollaboratorModal, setdeleteCollaboratorModal] = useState(false);
  const [searcherInput, setsearcherInput] = useState(false);

  const navigate=useNavigate();
  const {auth}= useAuth();
  useEffect(() => {
    getProjects();
  }, [auth]);

  useEffect(() => {
    socket=io(import.meta.env.VITE_URL_BACKEND);
  }, [])
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
      setTimeout(()=>{
        setAlert({})
      },3000)
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
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }
  // /get all projects
  const getProjects = async ()=>{
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios('/projects',config);
      setprojects(data.projects)
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }
  // get project
  const getProject = async (id)=>{
    setloadingProject(true);
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios(`/projects/${id}`,config);
      setproject(data);
      setAlert({})
    } catch (e) {
      navigate('/projects');
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
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
      setAlert({})
      setmodalTaskForm(false);
      // socket io
      socket.emit('new task',data)
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }

  const updateTask=async task => {
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.put(`/tasks/${task.id}`,task,config);
      
      setAlert({})
      setmodalTaskForm(false);
      // socket
      socket.emit('update-task',data);
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
      
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

      setdeleteModalTask(false);
      
      // socket
      socket.emit('delete task',task)
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
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }

  const submitCollaborator = async email=>{
    setloadingProject(true);
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.post('/projects/collaborators',{email},config);
      setcollaborator(data);
      setAlert({})
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
    }finally{
      setloadingProject(false);
    }
  }

  const addCollaborator= async email => {
    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.post(`/projects/collaborators/${project.uid}`,email,config);
      setAlert({
        msg: data.msg,
        error:false
      })
      setcollaborator({})
      setTimeout(()=>{
        setAlert({})
      },2000)
    } catch (e) {

      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }

  const handleDeleteModallCollaborator=(collaborator)=>{
    setcollaborator(collaborator)
    setdeleteCollaboratorModal(!deleteCollaboratorModal)
  }

  const deleteCollaborator =async()=>{
  //  delete-collaborator
  try {
    const config =getTokenHeaders();
    const {data} = await clienteAxios.post(`/projects/delete-collaborator/${project.uid}`,collaborator,config);
    const projectupdated={...project};
    projectupdated.collaborators=projectupdated.collaborators.filter(col=>col._id!==collaborator._id);
    setproject(projectupdated);
    setdeleteCollaboratorModal(false);
    setAlert({
      msg: data.msg,
      error:false
    })
    setcollaborator({})
    setTimeout(()=>{
      setAlert({})
    },2000)
  } catch (e) {

    const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
    setAlert({
      msg:error,
      error:true
    })
    setTimeout(()=>{
      setAlert({})
    },3000)
  }
  }

  const handleTaskSate=async id => {

    try {
      const config =getTokenHeaders();
      const {data} = await clienteAxios.post(`/tasks/status/${id}`,{},config);
      
      settask({})
      setAlert({})
      // /socket
      socket.emit('change-status-task',data.task)
    } catch (e) {
  
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setAlert({
        msg:error,
        error:true
      })
      setTimeout(()=>{
        setAlert({})
      },3000)
    }
  }

  const handleSearcherInput=()=>{
    setsearcherInput(!searcherInput);
  }

  // socketIo
  // tasks
  const submitTaskProject=(task)=>{
    const projectupdated={...project};
    projectupdated.tasks=[...projectupdated.tasks,task];
    setproject(projectupdated);
  }

  const deleteTaskProject=(task)=>{
    const projectupdated={...project};
      projectupdated.tasks=projectupdated.tasks.filter(t=> t._id !== task._id);
      setproject(projectupdated)
  }

  const updateTaskProject=(task)=>{
    const projectupdated={...project};
      projectupdated.tasks=projectupdated.tasks.map(t => t._id===task._id?task:t);
      setproject(projectupdated);
  }
  const changeSatusTaskProject=(task)=>{
    const projectupdated={...project};
      projectupdated.tasks=projectupdated.tasks.map(t=>t._id==task._id?task:t);
      setproject(projectupdated);
  }
  // logout
  const logoutProjects=()=>{
    setprojects([]);
    setproject({})
    setAlert({})
    settask({})
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
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteModallCollaborator,
        deleteCollaboratorModal,
        deleteCollaborator,
        handleTaskSate,
        handleSearcherInput,
        searcherInput,
        submitTaskProject,
        deleteTaskProject,
        updateTaskProject,
        changeSatusTaskProject,
        logoutProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsProvider}


export default ProjectsContext;