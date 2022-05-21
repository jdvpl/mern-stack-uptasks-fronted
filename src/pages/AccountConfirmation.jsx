import {useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Mensaje';
import { VITE_URL_API } from '../utils';


const AccountConfirmation = () => {

  const [alerta, setalerta] = useState({});
  const [confirmed, setconfirmed] = useState(false);

  const {id}=useParams();

  useEffect(() => {
    const confirmarCuenta=async() => {
      const url=VITE_URL_API+'/users/confirm/'+id;
      console.log(url);
      try {
        const {data}=await axios(url);
        setalerta({
          msg:data.msg,
          error:false
        })
        setconfirmed(true);
      } catch (error) {
        setalerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta();
  }, []);

  const {msg}=alerta;
  return (
    <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
       <h1 className="text-sky-600 font-black text-5xl text-center">Confirma tu {""}<span className="text-slate-700"> cuenta</span></h1>

      {msg && <Mensaje alerta={alerta}/>}

      {confirmed && (
        <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm">Iniciar sesion</Link>
      )}
    </div>
  )
}

export default AccountConfirmation