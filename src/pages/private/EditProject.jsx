
import {useParams} from 'react-router-dom'
import useProjects from '../../hooks/useProjects';
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import NewProjectForm from '../../components/private/NewProjectForm';
const EditProject = () => {
  const {getProject,project,loadingProject}=useProjects();
  
  const {id:idRouter}=useParams();
  
  useEffect(() => {
    getProject(idRouter);
  }, [])

  const {name,description,dateDelivery,client}=project;
  return loadingProject ? (
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
    <>
      <h1 className="font-black text-4xl uppercase text-center">Project: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <NewProjectForm />
      </div>
      </>
  )
}

export default EditProject