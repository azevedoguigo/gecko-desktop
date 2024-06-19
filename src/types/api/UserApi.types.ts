import { AxiosInstance } from "axios";

export type ILoginResponse = {
  data: string
}

export type IMessageResponse = {
  message: string
}

export default abstract class IUserApi {
  protected api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public abstract login(email: string, password: string): Promise<ILoginResponse>
}