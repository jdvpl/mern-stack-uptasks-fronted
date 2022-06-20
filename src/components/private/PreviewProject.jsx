import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const PreviewProject = ({project}) => {
  const {auth}= useAuth();

  const {name,uid,description,dateDelivery,client,creator}=project;

  return (
    <div className="border-b p-5 flex justify-between">
      <div className="flex gap-2 items-center">
      <p className="flex-1">{name}

        <span className="text-sm text-gray-500 uppercase">{""} {client}</span>
      </p>
      {auth._id || auth.uid !== creator._id &&(
        <p className="p-1 text-sm rounded-lg text-white bg-green-500 font-bold uppercase">Collaborator</p>
      )}
      </div>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      to={`${uid}`}>See more</Link>
    </div>
  )
}

export default PreviewProject