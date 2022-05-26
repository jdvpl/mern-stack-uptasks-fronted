import NewProjectForm from '../../components/private/NewProjectForm'

const NewProject = () => {
  return (
    <>
    <h1 className="font-black text-4xl text-center">New Project</h1>
    <div className="mt-5 flex justify-center">
        <NewProjectForm />
    </div>
  </>
  )
}

export default NewProject