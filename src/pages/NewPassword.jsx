import {useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Mensaje';
import { VITE_URL_API } from '../utils';
const NewPassword = () => {
  const [alerta, setalerta] = useState({})
  const [validToken, setvalidToken] = useState(false);

  const [password, setpassword] = useState('');
  const [repetirpassword, setrepetirpassword] = useState('');

  const {token}=useParams();

  useEffect(() => {
    validateToken();
  }, [])

  const validateToken = async () => {
    const url=VITE_URL_API+'/users/forget-password/'+token;
    console.log(url)
    try {
      await axios(url);
      setvalidToken(true);
    } catch (e) {
      const error=(e.response.data.errors)?e.response.data.errors[0].msg: e.response.data.msg;
      setalerta({
        msg:error,
        error:true
      })
    }
  }
  const {msg}=alerta;

  const handleSubmit=(e)=>{
    e.preventDefault();
    if([password.trim(),repetirpassword.trim()].includes('')){
      setalerta({
        msg: 'Por favor escribir las contraseñas',
        error:true
      })
      return;
    }
    if(password.trim().length <6){
      setalerta({
        msg: 'La contraseña no debe ser menor a 6 caracteres',
        error:true
      })
      return;
    }

    if(password !== repetirpassword){
      setalerta({
        msg: 'Las contraseñas no coinciden',
        error:true
      })
      return;
    }
    updatePassword(password);
  }


  const updatePassword=async(password)=>{
    const url=VITE_URL_API+'/users/forget-password/'+token;

    try {
      const {data}=await axios.post(url,{password});
      setalerta({
        msg:data.msg,
        error:false
      })
    } catch (e) {
      const error=(e.response.data.errors)?e.response.data.errors[0].msg: e.response.data.msg;
      setalerta({
        msg: error,
        error:true
      })
    }
  }
  return (
    <>
    <h1 className="text-sky-600 font-black text-5xl text-center">Restablecer {""}<span className="text-slate-700"> contraseña</span></h1>
    {msg && <Mensaje alerta={alerta}/>}
    {validToken && (
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
        <input type="password" id="password" placeholder="Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e=> setpassword(e.target.value)}/>
      </div>
      <div className="my-5">
        <label htmlFor="repetirpassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
        <input type="password" id="repetirpassword" placeholder="Repetir Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={repetirpassword} onChange={e =>setrepetirpassword(e.target.value)}/>
      </div>
      
      <input type="submit" value="Guarda nueva contraseña" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
    </form>
    )}

    <nav className="lg:flex lg:justify-center ">
      <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm"> Iniciar sesion</Link>
    </nav>
  </>
  )
}

export default NewPassword