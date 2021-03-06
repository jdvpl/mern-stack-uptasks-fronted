import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AccountConfirmation from './pages/AccountConfirmation'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import NewPassword from './pages/NewPassword'
import Register from './pages/Register'

import ProtectedRoute from './layouts/ProtectedRoute'
import Projects from './pages/private/Projects'
import NewProject from './pages/private/NewProject'

import {AuthProvider} from './context/AuthProvider'
import {ProjectsProvider} from './context/ProjectsProvider'
import Project from './pages/private/Project'
import EditProject from './pages/private/EditProject'
import NewCollaborator from './pages/private/NewCollaborator'

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
    <ProjectsProvider>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='forget-password' element={<ForgetPassword/>} />
          <Route path='forget-password/:token' element={<NewPassword/>} />
          <Route path='confirm/:id' element={<AccountConfirmation/>} />
        </Route>

        <Route path='/projects' element={<ProtectedRoute />} >
          <Route index element={<Projects/>}/>
          <Route path='create-project' element={<NewProject/>}/>
          <Route path='new-collaborator/:id' element={<NewCollaborator/>}/>
          <Route path=':id' element={<Project/>}/>
          <Route path='edit/:id' element={<EditProject/>}/>
        </Route>
      </Routes>
      </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
