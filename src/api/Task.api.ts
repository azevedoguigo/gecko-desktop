import ITaskApi, { ICreateTaskResponse, IGetTaskResponse, IUpdateTaskResponse } from "../types/api/TaskApi.types.ts"

export default class TaskApi extends ITaskApi {
  public createTask = async (title: string, description: string): Promise<ICreateTaskResponse> => {
    return await this.api.post("/tasks", {
      title,
      description
    }, { 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
     })
      .then(response => response.data)
      .then(data => {
        return data
      }).catch(error => {
        throw error.response.data
      })
  }

  public getTasks = async (): Promise<IGetTaskResponse[]> => {
    return await this.api.get("/tasks/all", { 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
     })
      .then(response => response.data)
      .then(data => {
        return data
      }).catch(error => {
        console.log(error)
      })
  }

  public updateTask = async (id: string, completed: boolean): Promise<IUpdateTaskResponse> => {
    return await this.api.put("/tasks", {
      completed
    },
    { 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      params: {
        id
      }
     })
      .then(response => response.data)
      .then(data => {
        return data
      }).catch(error => {
        console.log(error.message)
      })
  }
}