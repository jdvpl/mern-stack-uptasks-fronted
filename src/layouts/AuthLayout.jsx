import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
  <>
    <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:1/2 bg-red-100">

        <Outlet/>
      </div>
    </main>

    {/* es para inyectar lo que esta en el outlet */}
  </>
  )
}

export default AuthLayout