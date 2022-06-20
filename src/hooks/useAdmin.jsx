import useProjects from './useProjects';
import useAuth from './useAuth';

const useAdmin=()=>{
  const {project}=useProjects();
  const {auth}=useAuth();
  return project.creator?._id===auth.uid

}

export default useAdmin;