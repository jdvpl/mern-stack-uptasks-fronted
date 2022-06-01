import {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import CollaboratorForm from '../../components/private/CollaboratorForm'
import useProjects from '../../hooks/useProjects'

const NewCollaborator = () => {
  const{project,getProject,loadingProject}=useProjects()
  const {id}=useParams()
  useEffect(() => {
    getProject(id)
  }, [])
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
    </>
  )
}

export default NewCollaborator