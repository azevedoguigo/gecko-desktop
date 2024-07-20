import { FormEvent, useEffect, useState } from "react"
import { 
  IDeleteTaskResponseError, 
  IGetTaskResponse, 
  IUpdateTaskRequestError 
} from "../types/api/TaskApi.types"
import AddTaskModal from "../components/AddTaskModal"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { TbReload } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import TaskApi from "../api/Task.api"
import api from "../config/api"

const taskApi = new TaskApi(api)

function HomePage() {
  const [tasks, setTasks] = useState<IGetTaskResponse[]>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [completed, setCompleted] = useState(true)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  async function reloadTasks() {
    try {
      const response = await taskApi.getTasks()

      setTasks(response.tasks)
    } catch(error) {
      toast.error("Error to reload task list!", { theme: "colored" })
    }
  }

  async function handleChecked(id: string) {
    try {
      setCompleted(!completed)

      await taskApi.updateTaskToCompleted(id, completed)
      
      setCompleted(false)
      reloadTasks()
    } catch(error) {
      toast.error("Error marking task as completed!", { theme: "colored" })
    }
  }

  function cleanInputs() {
    setTitle("")
    setDescription("")
  }

  async function handleUpdateTask(
    e: FormEvent<HTMLElement>, 
    id: string, 
    actualTitle: string,
    actualDescription: string
  ) {
    e.preventDefault()

    try {
      let newTitle = title
      let newDescription = description
      
      if (!title)
        newTitle = actualTitle

      if (!description)
        newDescription = actualDescription

      if (!title && !description) {
        toast.warning(
          "Provide at least one parameter to be updated.", 
          { theme: "colored" }
        )
      } else {
        const response = await taskApi.updateTask(id, newTitle, newDescription)

        reloadTasks()
        cleanInputs()
        toast.success(response.message, {theme: "colored"})
      }
    } catch(error) {
      const requestErros = error as IUpdateTaskRequestError
      console.log(requestErros)

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

  async function handleDeleteTask(id: string) {
    try {
      const response = await taskApi.deleteTask(id)

      toast.success(response.message, { theme: "colored" })
      reloadTasks()
    } catch (error) {
      const responseError = error as IDeleteTaskResponseError

      if (responseError.data.status == 404) {
        toast.warning(responseError.data.message, { theme: "colored" })
      } else if (responseError.data.status == 400) {
        toast.error(responseError.data.message, { theme: "colored" })
      } else {
        toast.error("Internal server error!", { theme: "colored" })
      }
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }

    async function loadTasks() {
      try {
        const response = await taskApi.getTasks()
        setTasks(response.tasks)
      } catch(error) {
        toast.error("Error to load task list!", { theme: "colored" })
      }
    }

    loadTasks()
  }, [])

  return(
    <div className="flex">
      <Sidebar />
      <main className="flex justify-center w-full px-4">
        <div className="overflow-x-auto mt-10">
          <h1 className="flex justify-center items-center text-2xl mb-6">Tasks</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Created At</th>
                <th>Last Update</th>
                <th className="flex items-center justify-center">
                  <AddTaskModal reloadTasks={ reloadTasks }/>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.length ? tasks.map(task => {
                return <tr key={task.id}>
                  <th>{ task.id }</th>
                  <td>{ task.title }</td>
                  <td>{ task.description }</td>
                  <td>{ task.completed ? "Yes" : "No" }</td>
                  <td>{ task.inserted_at }</td>
                  <td>{ task.updated_at }</td>
                  <td className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      defaultChecked={ task.completed }
                      onChange={ () => handleChecked(task.id) }
                      className="checkbox" 
                    />

                    <details className="dropdown dropdown-end">
                      <summary 
                        className="ml-4"
                      >
                        <FaPencil size={25} />
                      </summary>
                      <div 
                        className="menu dropdown-content bg-base-200 rounded-box z-[1] p-2 shadow"
                      >
                        <h3 className="flex items-center justify-center font-bold text-lg mb-2">
                          Update Task
                        </h3>

                        <form
                          className="flex flex-col gap-2"
                          onSubmit={(e) => handleUpdateTask(e, task.id, task.title, task.description)}
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
                            <TbReload />
                            Update
                          </button>
                        </form>
                      </div>
                    </details>

                    <button 
                      className="ml-4"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrash size={25} />
                    </button>
                  </td>
                </tr>
              }) : <div></div> }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default HomePage