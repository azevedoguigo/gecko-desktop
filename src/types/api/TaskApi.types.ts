import { AxiosInstance } from "axios"

export type ICreateTaskResponse = {
  data: {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    inserted_at: string,
    updated_at: string,
    user_id: string
  },
  message: string,
}

export type IGetTaskResponse = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  inserted_at: string,
  updated_at: string,
  user_id: string
}

export type IUpdateTaskResponse = {
  task: {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    inserted_at: string,
    updated_at: string,
    user_id: string
  },
  message: string,
}

export type IMessageResponse = {
  message: string
}

export default abstract class ITaskApi {
  protected api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public abstract getTasks(): Promise<IGetTaskResponse[]>
  public abstract createTask(title: string, description: string): Promise<ICreateTaskResponse>
  public abstract updateTask(id: string, completed: boolean): Promise<IUpdateTaskResponse>
}
