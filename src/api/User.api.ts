import IUserApi, { ILoginResponse, IMessageResponse } from "../types/api/UserApi.types.ts"

export default class UserApi extends IUserApi {
  public login = async (email: string, password: string): Promise<ILoginResponse> => {
    return await this.api.post("/login", { email, password })
      .then(response => response.data)
      .then(data => {
        localStorage.setItem("token", data.data)

        return data
      }).catch(error => {
        console.log(error.response.data.message)
        throw error.response
      })
  }

  public register = async (name: string, email: string, password: string): Promise<IMessageResponse> => {
    return await this.api.post("/users", { name, email, password })
      .then(response => response.data)
      .then(data => {
        
        return data
      }).catch(error => {
        console.log(error)
      })
  }
}