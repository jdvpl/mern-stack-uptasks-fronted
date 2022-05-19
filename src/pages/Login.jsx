import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl text-center">Iniciar sesion y administra tus {""}<span className="text-slate-700"> proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">

        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" id="password" placeholder="Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
        </div>
        <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link to='/register' className="block text-center my-5 text-slate-500 uppercase text-sm">No tienes cuenta?</Link>
        <Link to='/forget-password' className="block text-center my-5 text-slate-500 uppercase text-sm">Olvide mi contraseña?</Link>
      </nav>
    </>
  )
}

export default Login