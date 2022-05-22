import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AccountConfirmation from './pages/AccountConfirmation'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import NewPassword from './pages/NewPassword'
import Register from './pages/Register'

import {AuthProvider} from './context/AuthProvider'

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='forget-password' element={<ForgetPassword/>} />
          <Route path='forget-password/:token' element={<NewPassword/>} />
          <Route path='confirm/:id' element={<AccountConfirmation/>} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
