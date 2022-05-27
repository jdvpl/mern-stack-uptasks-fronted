import {useState,useEffect} from 'react'
import useProjects from '../../hooks/useProjects';
import Mensaje from '../Mensaje';
import {useParams} from 'react-router-dom';

const NewProjectForm = () => {
  const [name, setname] = useState('')
  const [id, setid] = useState(null)
  const [description, setdescription] = useState('');
  const [dateDelivery, setdateDelivery] = useState('')
  const [client, setclient] = useState('');

  const params=useParams();
  // context global
  const {showAlert,alert,postProject, project}=useProjects();

  useEffect(() => {
      if(params.id){
        setid(project.uid)
        setname(project.name);
        setdescription(project.description);
        setdateDelivery(project.dateDelivery?.split('.')[0]);
        setclient(project.client);
      }
  }, [params])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if([name,description,dateDelivery,client].includes('')){
      showAlert({
        msg:'Each field is required',
        error: true
      })
      return;
    }

    // set data to provider
    await postProject({name, description, dateDelivery,  client});
    setname('')
    setdescription('')
    setdateDelivery('')
    setclient('')
  }

  const {msg}=alert;





  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>

      {msg && <Mensaje alerta={alert}/>}
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 uppercase font-weight text-sm">Project Name</label>
        <input type="text" name="" id="name" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Project Name" 
        value={name} 
        onChange={e => setname(e.target.value)}/>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="text-gray-700 uppercase font-weight text-sm">Description</label>
        <textarea  id="description" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Project description" 
        value={description} 
        onChange={e => setdescription(e.target.value)}/>
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
        value={client} 
        onChange={e => setclient(e.target.value)}/>
      </div>

      <input type="submit" className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" value={id?'Update Proejct':'Create project'} />
    </form>
  )
}

export default NewProjectForm