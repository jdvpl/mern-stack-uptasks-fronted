import axios from 'axios';

const clienteAxios=axios.create({
  baseURL: `${import.meta.env.VITE_URL_API_LOCAL}`
})
export default clienteAxios;