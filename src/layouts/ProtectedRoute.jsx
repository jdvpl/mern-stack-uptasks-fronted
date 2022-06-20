import {Outlet,Navigate} from 'react-router-dom'
import Header from '../components/private/Header';
import Sidebar from '../components/private/Sidebar';
import useAuth from '../hooks/useAuth'


const ProtectedRoute = () => {

  const {auth,loading}=useAuth();

  if(loading) return;
  return (
    <>
      {auth.uid ? (
        <div className="bg-gray-100">
          <Header/>
          <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <main className="flex-1 md:p-10 p-3">
              <Outlet/>
            </main>
          </div>
        </div>
      ) :<Navigate  to="/"/>}
    </>
  )
}

export default ProtectedRoute