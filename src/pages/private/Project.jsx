import {Link, useParams} from 'react-router-dom'
import useProjects from '../../hooks/useProjects';
import useAdmin from '../../hooks/useAdmin';
import {useEffect} from 'react';
import Mensaje from '../../components/Mensaje';
import ModalTaskForm from '../../components/private/ModalTaskForm';
import Task from '../../components/private/Task';
import ModalDeleteTask from '../../components/private/ModalDeleteTask';
import Collaborator from './Collaborator';
import ModalDeleteCollaborator from '../../components/private/ModalDeleteCollaborator';

const Project = () => {
const {getProject,project,loadingProject,deleteProject,alert,handleTaskForm}=useProjects();
  
  const admin=useAdmin();
  console.log(admin)
  const {id:idRouter}=useParams();
  
  useEffect(() => {
    getProject(idRouter);
  }, [])
  const deleteProjectHandle=() => {
    if(confirm('Are you sure you want to delete this project?')){
      deleteProject(idRouter);
    }
  }
  const {name}=project;
  const {msg}=alert;
  
  return (
    loadingProject ? (
      <div className="border border-blue-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
    ) : (
      msg && alert.error? <Mensaje alerta={alert}/>: (
      <>
      
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">{name}</h1>
      
      {admin &&(
      <div className="flex items-center gap-2 text-gray-400 hover:text-black uppercase font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
      </svg>
      <Link to={`/projects/edit/${idRouter}`} className="uppercase font-bold">Edit</Link>

      <div className="flex items-center gap-2 text-gray-400 hover:text-black uppercase font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <button className="uppercase font-bold" onClick={deleteProjectHandle}>Delete</button>
      </div>
      </div>
    )}
    </div>
    { admin && (
      <button 
        onClick={handleTaskForm}
      type="button" className="uppercase font-bold text-sm px-5 py-3 w-full md:w-auto rounded-lg bg-sky-400 text-center text-white mt-5 flex gap-2 items-center justify-center" >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
        Add Task
        </button>
        )}
        <p className="font-bold text-xl mt-10 ">Project Tasks</p>
        <div className="shadow mt-1o rounded-lg">
          {project.tasks?.length ? 
          project.tasks?.map(task => (
            <Task
              key={task._id}
              task={task}
            />
          )).sort()
            :<p className="font-bold text-center my-5 p-10">No tasks.</p>}
        </div>
        {admin && (
          <>
        <div className="flex items-center justify-between mt-10">
          <p className="font-bold text-xl">Collaborators.</p>
          <Link 
            to={`/projects/new-collaborator/${idRouter}`}
            className='text-gray-400 uppercase font-bold hover:text-black'>
          Add
          </Link>
        </div>
        <div className="shadow mt-1o rounded-lg">
        {project.collaborators?.length ? 
          project.collaborators?.map(collaborator => (
            <Collaborator
              key={collaborator._id}
              collaborator={collaborator}
            />
          )).sort()
            :<p className="font-bold text-center my-5 p-10">No collaborators.</p>}
        </div>
          </>
        )}
        <ModalDeleteTask/>
        <ModalTaskForm/>
        <ModalDeleteCollaborator/>
    </>
    )
    )
    )

}

export default Project