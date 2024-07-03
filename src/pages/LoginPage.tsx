import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserApi from "../api/User.api"
import api from "../config/api"
import EmailIcon from "../components/Icons/EmailIcon"
import KeyIcon from "../components/Icons/KeyIcon"
import { ILoginRequestError } from "../types/api/UserApi.types"
import { toast } from "react-toastify"

const userApi = new UserApi(api)

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleLogin(e: FormEvent<HTMLElement>) {
    e.preventDefault()

    try {
      await userApi.login(email, password)
      
      navigate("/")
    } catch(error) {
      const requestError = error as ILoginRequestError

      if (requestError.data.message) {
        toast.warning(requestError.data.message, { theme: "colored" })
      } else {
        toast.error("Internal server error!", { theme: "colored" })
      }
    }
  }

  return(
    <div className="h-screen flex items-center justify-center">
      <form 
        className="flex flex-col w-1/3"
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="flex justify-center text-2xl mb-4 font-semibold">Welcome back!</h1>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <EmailIcon />
          <input 
            type="text" 
            className="grow" 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <KeyIcon />
          <input 
            type="password" 
            className="grow" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="flex items-center justify-center my-2">
          <span className="mr-2">
            Don't have an account yet?
          </span>
          <Link 
            to={"/register"}
            className="text-blue-700"
          >
            Register
          </Link>
        </div>

        <button className="btn btn-primary text-lg">Login</button>
      </form>
    </div>
  )
}

export default LoginPage