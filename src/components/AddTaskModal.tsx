import { FormEvent, useState } from "react"
import { FaPlus } from "react-icons/fa"
import TaskApi from "../api/Task.api"
import api from "../config/api"

const taskApi = new TaskApi(api)

type Props = {
  reloadTasks: () => void
}

const AddTaskModal: React.FC<Props> = ({ reloadTasks }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleCreateTask(e: FormEvent<HTMLElement>) {
    e.preventDefault()

    try {
      console.log(title, description)
      const response = await taskApi.createTask(title, description)

      console.log(response.message)
      reloadTasks()
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <button 
        className="flex flex-row items-center gap-2 cursor-pointer" 
        onClick={()=>document.getElementById('my_modal_5').showModal()}
      >
        <FaPlus /> Add
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="flex items-center justify-center font-bold text-lg mb-2">
            Add New Task
          </h3>

          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => handleCreateTask(e)}
          >
            <label className="input input-bordered flex items-center gap-2">
              <input 
                type="text" 
                className="grow" 
                placeholder="Title" 
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input 
                type="text" 
                className="grow" 
                placeholder="Description" 
                onChange={(e) => setDescription(e.target.value)}  
              />
            </label>

            <button className="btn btn-primary text-lg font-bold mt-3">
              <FaPlus />
              Add
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AddTaskModal