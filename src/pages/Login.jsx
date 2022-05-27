import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import clienteAxios from '../config/Axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [alerta, setalerta] = useState({});

  const {setauth}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=(e) => {
    e.preventDefault();
    if([password.trim(), email.trim()].includes('')){
      setalerta({
        msg:'Every field is required',
        error:true
      })
      return;
    }
    login(email, password);
  }

  const login = async(email, password) => {
    try {
      const {data}=await clienteAxios.post('/auth/login',{email,password})
      setalerta({})
      localStorage.setItem('token',data.token)
      setauth(data.user)
      navigate('/projects')
    } catch (e) {
      const error=(e.response.data.errors)? e.response.data.errors[0].msg : e.response.data.msg;
      setalerta({
        msg:error,
        error:true
      })
    }
  }

  const {msg}=alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl text-center">Login and manage your {""}<span className="text-slate-700"> projects</span></h1>

      {msg && <Mensaje alerta={alerta}/>}
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>

        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e=> setemail(e.target.value)}/>
        </div>

        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" id="password" placeholder="Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e=> setpassword(e.target.value)}/>
        </div>
        <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link to='/register' className="block text-center my-5 text-slate-500 uppercase text-sm">Don't have an account yet?</Link>
        <Link to='/forget-password' className="block text-center my-5 text-slate-500 uppercase text-sm">Forgot my password?</Link>
      </nav>
    </>
  )
}

export default Login