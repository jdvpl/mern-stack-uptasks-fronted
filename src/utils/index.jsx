export const getTokenHeaders =()=>{
  const token=sessionStorage.getItem('token');
      if(!token) return;
      const config ={
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      return config;
}

export const PRIORITY=['Low','Medium','High'];