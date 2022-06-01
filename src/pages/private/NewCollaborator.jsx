import React from 'react'
import CollaboratorForm from '../../components/private/CollaboratorForm'

const NewCollaborator = () => {
  return (
    <>
      <h1 className="text-4xl font-black">New Collaborator</h1>
      <div className="mt-10 flex justify-center">
      <CollaboratorForm/>
      </div>
    </>
  )
}

export default NewCollaborator