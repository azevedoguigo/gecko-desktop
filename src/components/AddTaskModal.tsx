import { FormEvent, useState } from "react"
import { FaPlus } from "react-icons/fa"
import TaskApi from "../api/Task.api"
import api from "../config/api"
import { toast } from "react-toastify"
import { ICreateTaskRequestError } from "../types/api/TaskApi.types"

const taskApi = new TaskApi(api)

type Props = {
  reloadTasks: () => void
}

const AddTaskModal: React.FC<Props> = ({ reloadTasks }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function cleanInputs() {
    setTitle("")
    setDescription("")
  }

  async function handleCreateTask(e: FormEvent<HTMLElement>) {
    e.preventDefault()

    try {
      const response = await taskApi.createTask(title, description)

      reloadTasks()
      cleanInputs()
      toast.success(response.message, {theme: "colored"})
    } catch(error) {
      const requestErros = error as ICreateTaskRequestError

      if (requestErros.errors.title) {
        toast.warning(
          `Title ${requestErros.errors.title[0]}`, 
          { theme: "colored" }
        )
      } else if (requestErros.errors.description) {
        toast.warning(
          `Description ${requestErros.errors.description[0]}`, 
          { theme: "colored" }
        )
      } else {
        toast.error("Internal server error", { theme: "colored" })
      }
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
                value={ title }
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input 
                type="text" 
                className="grow" 
                placeholder="Description" 
                value={ description }
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