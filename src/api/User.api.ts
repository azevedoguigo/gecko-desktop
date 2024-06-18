import IUserApi, { ILoginResponse } from "../types/api/UserApi.types.ts"

export default class UserApi extends IUserApi {
  public login = async (email: string, password: string): Promise<ILoginResponse> => {
    return await this.api.post("login", { email, password })
      .then(response => response.data)
      .then(data => {
        localStorage.setItem("token", data)

        return data
      }).catch(error => {
        console.log(error)
      })
  }
}