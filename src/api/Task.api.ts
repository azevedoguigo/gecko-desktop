import ITaskApi, { ICreateTaskResponse, IGetTaskResponse } from "../types/api/TaskApi.types.ts"

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
        console.log(error.message)
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
}