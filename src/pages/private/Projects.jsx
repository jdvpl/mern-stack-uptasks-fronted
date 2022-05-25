import useProjects from '../../hooks/useProjects';

const Projects = () => {
  const {projects}=useProjects();
  console.log(projects)
  return (
    <>
      <h1 className="font-black text-4xl">Proyectos</h1>
      <div>
        
      </div>
    </>
  )
}

export default Projects