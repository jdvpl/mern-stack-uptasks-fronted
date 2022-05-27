import {useParams} from 'react-router-dom'
import useProjects from '../../hooks/useProjects';
import {useEffect} from 'react';

import {Link} from 'react-router-dom';

const Project = () => {
  const {getProject,project,loadingProject}=useProjects();
  
  const {id:idRouter}=useParams();
  
  useEffect(() => {
    getProject(idRouter);
  }, [])

  const {name,description,dateDelivery,client}=project;
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
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">{name}</h1>

      <div className="flex items-center gap-2 text-gray-400 hover:text-black uppercase font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
      </svg>
      <Link to={`/projects/edit/${idRouter}`}>Edit</Link>
      </div>
    </div>
    )
    )

}

export default Project