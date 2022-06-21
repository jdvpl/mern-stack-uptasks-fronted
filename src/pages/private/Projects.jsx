import {useEffect} from 'react';
import Mensaje from '../../components/Mensaje';
import PreviewProject from '../../components/private/previewProject';
import useProjects from '../../hooks/useProjects';
import io from 'socket.io-client'

let socket;
const Projects = () => {
  const {projects,alert}=useProjects();
  useEffect(() => {
    socket=io(import.meta.env.VITE_URL__LOCAL)
    socket.emit('test',"kakaroto")
    socket.on('response',(name) => {
      console.table(name)
    })
  }, []);
  const {msg}=alert;
  return (
    <>
      {msg && <Mensaje alerta={alert}/>}
      <h1 className="font-black text-4xl">Projects</h1>
      <div className="bg-white shadow rounded-lg mt-10">
        {projects.length ?  projects.map(project =>(
          <PreviewProject
            key={project.uid}
            project={project}/>
        )): <p className="mt-5 text-center text-gray-600 uppercase p-5">0 Projects</p>}
      </div>
    </>
  )
}

export default Projects