import {useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom';
import Mensaje from '../components/Mensaje';
import clienteAxios from '../config/Axios';

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
    try {
      await clienteAxios('/users/forget-password/'+token);
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

    try {
      const {data}=await clienteAxios.post('/users/forget-password/'+token,{password});
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
    <h1 className="text-sky-600 font-black text-5xl text-center">Reset {""}<span className="text-slate-700"> password</span></h1>
    {msg && <Mensaje alerta={alerta}/>}
    {validToken && (
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
        <input type="password" id="password" placeholder="Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e=> setpassword(e.target.value)}/>
      </div>
      <div className="my-5">
        <label htmlFor="repetirpassword" className="uppercase text-gray-600 block text-xl font-bold">Password confirmation</label>
        <input type="password" id="repetirpassword" placeholder="Password confirmation" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={repetirpassword} onChange={e =>setrepetirpassword(e.target.value)}/>
      </div>
      
      <input type="submit" value="Save" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
    </form>
    )}

    <nav className="lg:flex lg:justify-center ">
      <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm"> Login</Link>
    </nav>
  </>
  )
}

export default NewPassword