import React from 'react'

const Mensaje = ({alerta}) => {
  return (
    <div className={`${alerta.error? 'from-red-400 to-red-600':'from-sky-400 to-sky-400'} bg-gradient-to-br text-center rounded-xl p-3 uppercase text-white font-bold my-5 text-sm`}>
      {alerta.msg}
    </div>
  )
}

export default Mensaje