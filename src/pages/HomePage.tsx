import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function HomePage() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  })
  return(
    <div>
      <Sidebar />
    </div>
  )
}

export default HomePage