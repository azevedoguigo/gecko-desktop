import { Route, Routes } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import HomePage from "./pages/HomePage"

function Router() {
  return(
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/login" element={ <LoginPage /> } />
    </Routes>
  )
}

export default Router