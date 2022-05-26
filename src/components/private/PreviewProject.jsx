import {Link} from 'react-router-dom'
const PreviewProject = ({project}) => {
  const {name,uid,description,dateDelivery,client}=project;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">{name}

        <span className="text-sm text-gray-500 uppercase">{""} {client}</span>
      </p>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      to={`${uid}`}>See more</Link>
    </div>
  )
}

export default PreviewProject