import {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Mensaje from '../../components/Mensaje'
import CollaboratorForm from '../../components/private/CollaboratorForm'
import useProjects from '../../hooks/useProjects'

const NewCollaborator = () => {
  const{project,getProject,loadingProject,collaborator,addCollaborator, alert}=useProjects()
  const {id}=useParams()
  useEffect(() => {
    getProject(id)
  }, [])

  if(!project.uid) return <>
  <Mensaje alerta={alert}/>
  <Loading/>
  </> 
  return loadingProject ? (
    <Loading/>
  )
  :
  (
    <>
      <h1 className="text-4xl font-black">Add new Collaborator to {project.name}</h1>
      <div className="mt-10 flex justify-center">
      <CollaboratorForm/>
      </div>
      {loadingProject? <Loading/> :collaborator.uid &&(
        <div className="flex  justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 w-full rounded-lg shadow">
            <h2 className="text-center text-2xl font-bold">Result:</h2>
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col mb-2">
              <p className="text-muted ">{collaborator.name}</p>
              <p className="text-sm ">{collaborator.email}</p>
            </div>
              <button type="button" className="bg-slate-500 px-5 py-2 text-white rounded-lg uppercase font-bold text-sm" onClick={()=>addCollaborator({email:collaborator.email})}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewCollaborator