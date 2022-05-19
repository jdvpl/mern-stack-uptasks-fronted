import {Link} from 'react-router-dom'
import {useState} from 'react'
const Register = () => {
  const [nombre, setnombre] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const [repetirpassword, setrepetirpassword] = useState('');
  return (
    <>
    <h1 className="text-sky-600 font-black text-5xl text-center">Crea tu cuenta y administra tus {""}<span className="text-slate-700"> proyectos</span></h1>

    <form className="my-10 bg-white shadow rounded-lg p-10">

      <div className="my-5">
        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
        <input type="text" id="name" placeholder="Nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={nombre} onChange={e=> setnombre(e.target.value)}/>
      </div>
      <div className="my-5">
        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
        <input type="email" id="email" placeholder="Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e=> setemail(e.target.value)}/>
      </div>

      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
        <input type="password" id="password" placeholder="Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e=> setpassword(e.target.value)}/>
      </div>
      <div className="my-5">
        <label htmlFor="repetirpassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
        <input type="password" id="repetirpassword" placeholder="Repetir Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={repetirpassword} onChange={e=> setrepetirpassword(e.target.value)}/>
      </div>
      <input type="submit" value="Crear cuenta" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
    </form>

    <nav className="lg:flex lg:justify-between ">
      <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm">Ya tienes cuenta? Iniciar sesion</Link>
      <Link to='/forget-password' className="block text-center my-5 text-slate-500 uppercase text-sm">Olvide mi contraseña?</Link>
    </nav>
  </>
  )
}

export default Register