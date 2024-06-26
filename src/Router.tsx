import { Route, Routes } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"

function Router() {
  return(
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage /> } />
    </Routes>
  )
}

export default Router