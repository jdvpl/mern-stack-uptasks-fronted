import {Link} from 'react-router-dom'
import {useState} from 'react'
import Mensaje from '../components/Mensaje';
import clienteAxios from '../config/Axios';
const Register = () => {
  const [nombre, setnombre] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const [repetirpassword, setrepetirpassword] = useState('');
  const [alerta, setalerta] = useState({});


  const handleSubmit=(e) => {
    e.preventDefault();
    if([nombre,email,password,repetirpassword].includes('')){
      setalerta({
        msg:'All fields are required',
        error: true
      })
      return;
    }
    if(password !== repetirpassword){
      setalerta({
        msg:'Password do not match',
        error: true
      })
      return;
    }
    if(password.length <6){
      setalerta({
        msg:'Password must be at least 6 characters',
        error: true
      })
      return;
    }
    registerUser(nombre,email,password);
    setalerta({});
    // crear usuario en la api
  }


    const registerUser = async(name='',email='',password='') =>{
      const info={
        name,email,password
      }
      try {
        const {status,data} =await clienteAxios.post('/users',info);
        if(status ===202){
          setalerta({msg:data.msg,error:false})
        }
        setnombre('')
        setemail('')
        setpassword('')
        setrepetirpassword('')
      } catch (e) {
        setalerta(
          {msg:e.response.data.errors[0].msg,
          error:true}
          );
      }
    }

  const {msg}=alerta;
  return (
    <>
    <h1 className="text-sky-600 font-black text-5xl text-center">Sign up and manage your {""}<span className="text-slate-700"> projects</span></h1>
    {msg&& <Mensaje alerta={alerta}/>}
    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
      
      <div className="my-5">
        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
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
        <label htmlFor="repetirpassword" className="uppercase text-gray-600 block text-xl font-bold">Repeat password</label>
        <input type="password" id="repetirpassword" placeholder="Repeat password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={repetirpassword} onChange={e=> setrepetirpassword(e.target.value)}/>
      </div>
      <input type="submit" value="Sign up" className="bg-sky-700 w-full text-white font-bold rounded py-3 hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"/>
    </form>

    <nav className="lg:flex lg:justify-between ">
      <Link to='/' className="block text-center my-5 text-slate-500 uppercase text-sm">Already have an account? Login</Link>
      <Link to='/forget-password' className="block text-center my-5 text-slate-500 uppercase text-sm">Forgot my password?</Link>
    </nav>
  </>
  )
}

export default Register