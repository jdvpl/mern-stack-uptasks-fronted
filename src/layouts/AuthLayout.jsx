import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
  <>
    <div>AuthLayout</div>

    {/* es para inyectar lo que esta en el outlet */}
    <Outlet/>
  </>
  )
}

export default AuthLayout