import useProjects from "../../hooks/useProjects";

const Collaborator = ({collaborator}) => {
  const {name,email,_id} =collaborator;
  const {handleDeleteModallCollaborator, deleteCollaboratorModal}=useProjects();
  return (
    <div
      className="border-b p-5 flex justify-between items-center"
      key={_id}>
        <div>
          <p>{name}</p>
          <p className="text-sm text-gray-700">{email}</p>
        </div>
        <div>
          <button type="button" className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={()=>handleDeleteModallCollaborator(collaborator)}>
            Delete
          </button>
        </div>
      </div>
  )
}

export default Collaborator