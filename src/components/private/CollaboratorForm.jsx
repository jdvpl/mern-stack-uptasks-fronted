import { useState } from "react"
import useProjects from "../../hooks/useProjects";
import Mensaje from "../Mensaje";

const CollaboratorForm = () => {
  const [email, setemail] = useState('');
  const {showAlert,alert,submitCollaborator,loading}=useProjects();
  
  const handleSubmit =async e =>{
    e.preventDefault();
    if(email==''){
      showAlert({
        msg:'Email is required',
        error: true
      })
      return;
    }


    await submitCollaborator(email);
    setemail('');
  }
  const {msg}=alert;
  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
      {msg && <Mensaje alerta={alert}/>}
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 uppercase font-weight text-sm">Email</label>
        <input type="email" id="email" className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md" placeholder="Email" value={email} onChange={e=>setemail(e.target.value)}/>
      </div>
      <input type="submit" className="bg-sky-600 hover:bg-sky-700 text-white p-3 w-full  uppercase font-bold cursor-pointer transition-colors rounded text-sm" value='search' />
    </form>
  )
}

export default CollaboratorForm