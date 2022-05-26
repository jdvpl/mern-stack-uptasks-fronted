import {useParams} from 'react-router-dom'
import useProjects from '../../hooks/useProjects';
import {useEffect} from 'react';

const Project = () => {
  const {getProject}=useProjects();
  
  const {id:idRouter}=useParams();

  useEffect(() => {
    getProject(idRouter);
  }, [])

  return (
    <div>Project</div>
  )
}

export default Project