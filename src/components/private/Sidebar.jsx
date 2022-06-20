import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Sidebar = () => {

  const {auth} = useAuth();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hi!, {auth.name}</p>
      <p className="text-sm uppercase">Email: {auth.email}</p>

      <Link to="create-project" className="bg-sky-600  w-full text-white uppercase block font-bld mt-5 text-center rounded-lg p-3">New Project</Link>
    </aside>
  )
}

export default Sidebar