export const getTokenHeaders =()=>{
  const token=localStorage.getItem('token');
      if(!token) return;
      const config ={
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      return config;
}