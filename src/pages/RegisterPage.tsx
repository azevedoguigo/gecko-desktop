import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserApi from "../api/User.api"
import api from "../config/api"
import { ICreateUserRequestError } from "../types/api/UserApi.types"
import { toast } from "react-toastify"
import UserIcon from "../components/Icons/UserIcon"
import EmailIcon from "../components/Icons/EmailIcon"
import KeyIcon from "../components/Icons/KeyIcon"

const userApi = new UserApi(api)

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleRegister(e:FormEvent<HTMLElement>) {
    e.preventDefault()

    try {
      const response = await userApi.register(name, email, password)

      toast.success(response.message, { theme:"colored" })
      navigate("/login")
    } catch(error) {
      const requestErros = error as ICreateUserRequestError
      
      if(requestErros.errors.name) {
        toast.warning(`Name ${requestErros.errors.name[0]}`, { theme: "colored" })
      } else if(requestErros.errors.email) {
        toast.warning(`Email ${requestErros.errors.email[0]}`, { theme: "colored" })
      } else if(requestErros.errors.password) {
        toast.warning(`Password ${requestErros.errors.password[0]}`, { theme: "colored" })
      } else {
        toast.error("Internal server error", { theme: "colored" })
      }
    }
  }

  return(
    <div className="h-screen flex items-center justify-center">
      <form 
        className="flex flex-col w-1/3"
        onSubmit={(e) => handleRegister(e)}
      >
        <h1 className="flex justify-center text-2xl mb-4 font-semibold">Create Account</h1>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <UserIcon />
          <input 
            type="text" 
            className="grow" 
            placeholder="Full name" 
            onChange={(e) => setName(e.target.value)}
          />
        </label>

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
            Already have an account?
          </span>
          <Link 
            to={"/login"}
            className="text-blue-700"
          >
            Login
          </Link>
        </div>

        <button className="btn btn-primary text-lg">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage