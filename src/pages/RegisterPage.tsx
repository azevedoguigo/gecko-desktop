import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserApi from "../api/User.api"
import api from "../config/api"

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

      console.log(response.message)
      navigate("/login")
    } catch(error) {
      console.log(error)
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Full name" 
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
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