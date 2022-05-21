import axios from 'axios';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import Mensaje from '../components/Mensaje';
import { VITE_URL_API } from '../utils';


const ForgetPassword = () => {
  const [email, setemail] = useState('');
  const [alerta, setalerta] = useState({});

  const handleSubmit=(e) => {
    e.preventDefault();
    if(email.trim()===""){
      setalerta({
        msg:"El correo es obligatorio",
        error: true
      });
      return;
    }

    sendEmail(email)
  }


  const sendEmail = async(email) => {
    const url=VITE_URL_API+'/users/forgotpassword';
    console.log(url)
    try {
      const {data}=await axios.post(url,{email});
      setalerta({
        msg:data.msg,
        error:false
      })
    } catch (e) {
      setalerta({
        msg:e.response.data.errors[0].msg?? e.response.data.msg,
        error:true
      })
    }
  }
  const {msg}=alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl text-center">Recuperar  {""}<span className="text-slate-700"> contraseña</span></h1>

      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>

        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" id="email" placeholder="Email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"  value={email} onChange={e=>setemail(e.target.value)}/>
        </div>

        {msg && <Mensaje alerta={alerta}/>}
        <input type="submit" value="Enviar instrucciones" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
      </form>
      

      <nav className="lg:flex lg:justify-between ">
        <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm">ya tienes unacuenta?</Link>
        <Link to='/register' className="block text-center my-5 text-slate-500 uppercase text-sm">No tienes cuenta?</Link>

      </nav>
    </>
  )
}

export default ForgetPassword