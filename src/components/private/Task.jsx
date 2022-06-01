import React from 'react'
import useProjects from '../../hooks/useProjects'
import { dateFormat } from '../../utils/DateFormat'

const Task = ({task}) => {
  const {handleEditTaskForm,handleDeleteTask}=useProjects();
  const {name,finished,description,priority,dateDelivery,_id} = task;

  return (
    <div className={`${!finished?'bg-red-50':'bg-green-50'} border-b p-5 flex justify-between items-center  `} key={_id}>
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 ">{description}</p>
        <p className="mb-1 text-sm">{dateFormat(dateDelivery)}</p>
        <p className="mb-1 text-xl">Priority: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleEditTaskForm(task)}
        >
          Edit
        </button>

        {
          finished ?
          (
            <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
              Unfinish
            </button>
          )
          :
          (
            <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Finish
            </button>
          )
        }
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={()=>handleDeleteTask(task)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Task