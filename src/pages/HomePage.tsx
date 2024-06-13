import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


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
      Home page
    </div>
  )
}

export default HomePage