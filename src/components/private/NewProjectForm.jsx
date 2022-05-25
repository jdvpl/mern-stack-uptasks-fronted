import {useState} from 'react'
import useProjects from '../../hooks/useProjects';
import Mensaje from '../Mensaje';

const NewProjectForm = () => {
  const [projectName, setprojectName] = useState('')
  const [descriptionProject, setdescriptionProject] = useState('');
  const [dateDelivery, setdateDelivery] = useState('')
  const [clientProject, setclientProject] = useState('');

  // context global
  const {showAlert,alert,postProject}=useProjects();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if([projectName,descriptionProject,dateDelivery,clientProject].includes('')){
      showAlert({
        msg:'Each field is required',
        error: true
      })
      return;
    }

    // set data to provider
    postProject({projectName, descriptionProject, dateDelivery, clientProject});
  }

  const {msg}=alert;



  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>

      {msg && <Mensaje alerta={alert}/>}
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 uppercase font-weight text-sm">Project Name</label>
        <input type="text" name="" id="name" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Project Name" 
        value={projectName} 
        onChange={e => setprojectName(e.target.value)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="text-gray-700 uppercase font-weight text-sm">Description</label>
        <textarea  id="description" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Project description" 
        value={descriptionProject} 
        onChange={e => setdescriptionProject(e.target.value)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="dateDelivery" className="text-gray-700 uppercase font-weight text-sm">Date Delivery</label>
        <input type="datetime-local" id="dateDelivery" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        value={dateDelivery} 
        onChange={e => setdateDelivery(e.target.value)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="client" className="text-gray-700 uppercase font-weight text-sm">Client</label>
        <input type="text" name="" id="client" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Project client" 
        value={clientProject} 
        onChange={e => setclientProject(e.target.value)}/>
      </div>

      <input type="submit" className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" value='New project' />
    </form>
  )
}

export default NewProjectForm