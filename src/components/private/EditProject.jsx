
import {useParams} from 'react-router-dom'
import useProjects from '../../hooks/useProjects';
import {useEffect} from 'react';
import {Link} from 'react-router-dom'
import NewProjectForm from './NewProjectForm';
const EditProject = () => {
  const {getProject,project,loadingProject}=useProjects();
  
  const {id:idRouter}=useParams();
  
  useEffect(() => {
    getProject(idRouter);
  }, [])

  const {name,description,dateDelivery,client}=project;
  return loadingProject ? (
    <div class="border border-blue-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded"></div>
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