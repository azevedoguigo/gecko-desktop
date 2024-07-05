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

export type ICreateTaskRequestError = {
  errors: {
    title: string[],
    description: string[]
  }
}

export type IUpdateTaskRequestError = {
  errors: {
    title: string[],
    description: string[]
  }
}

export type IDeleteTaskResponseError = {
  data: {
    message: string,
    status: number
  }
}

export default abstract class ITaskApi {
  protected api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public abstract getTasks(): Promise<IGetTaskResponse[]>
  public abstract createTask(title: string, description: string): Promise<ICreateTaskResponse>
  public abstract updateTask(id: string, title: string, description: string): Promise<IUpdateTaskResponse>
  public abstract updateTaskToCompleted(id: string, completed: boolean): Promise<IUpdateTaskResponse>
  public abstract deleteTask(id: string): Promise<IMessageResponse>
}
