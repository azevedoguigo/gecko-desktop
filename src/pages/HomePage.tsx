import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import TaskApi from "../api/Task.api"
import api from "../config/api"
import { IGetTaskResponse } from "../types/api/TaskApi.types"
import { FaPlus } from "react-icons/fa"

const taskApi = new TaskApi(api)

function HomePage() {
  const [tasks, setTasks] = useState<IGetTaskResponse[]>()

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }

    async function loadTasks() {
      try {
        const response = await taskApi.getTasks()

        setTasks(response)
      } catch(error) {
        console.log(error)
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
                <th className="flex flex-row items-center gap-2"><FaPlus /> Add</th>
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
                      className="checkbox" 
                    />
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