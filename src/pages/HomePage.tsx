import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import TaskApi from "../api/Task.api"
import api from "../config/api"
import { IDeleteTaskResponseError, IGetTaskResponse } from "../types/api/TaskApi.types"
import AddTaskModal from "../components/AddTaskModal"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"

const taskApi = new TaskApi(api)

function HomePage() {
  const [tasks, setTasks] = useState<IGetTaskResponse[]>()
  const [completed, setCompleted] = useState(true)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  async function reloadTasks() {
    try {
      const response = await taskApi.getTasks()

      setTasks(response)
    } catch(error) {
      toast.error("Error to reload task list!", { theme: "colored" })
    }
  }

  async function handleChecked(id: string) {
    try {
      setCompleted(!completed)
      console.log(`before ${completed}`)
      const response = await taskApi.updateTask(id, completed)
      
      console.log(response.message)
      setCompleted(false)
      reloadTasks()
    } catch(error) {
      toast.error("Error marking task as completed!", { theme: "colored" })
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

        setTasks(response)
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
                <th>
                  <AddTaskModal reloadTasks={ reloadTasks }/>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map(task => {
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

                    <button 
                      className="ml-4"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrash size={25} />
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default HomePage