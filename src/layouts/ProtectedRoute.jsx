import {Outlet,Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const ProtectedRoute = () => {

  const {auth,loading}=useAuth();

  if(loading) return;
  return (
    <>
      {auth.uid ? <Outlet/> :<Navigate  to="/"/>}
    </>
  )
}

export default ProtectedRoute