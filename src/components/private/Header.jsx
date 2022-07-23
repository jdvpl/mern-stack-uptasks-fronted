import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';
import Searcher from './Searcher';
const Header = () => {
  const {handleSearcherInput,logoutProjects}=useProjects();
  const{logoutUser}=useAuth();
  const handelLogout =()=>{
    logoutProjects();
    logoutUser();
    sessionStorage.removeItem('token');
  }
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">Uptask</h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="font-bold uppercase" type="search" onClick={()=>handleSearcherInput()}>Search project</button>
          <Link to="/projects" className="font-bold uppercase">Projects</Link>
          <button type="button" className=" text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold" onClick={handelLogout}>Logout</button>
          <Searcher/>
        </div>
      </div>
    </header>
  )
}

export default Header