import {useState,useEffect,createContext} from 'react'


const AuthContext =createContext();

const AuthProvider=({children})=>{
  const [auth, setauth] = useState({});


  return (
    <AuthContext.Provider
      value={{
        setauth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider}


export default AuthContext;