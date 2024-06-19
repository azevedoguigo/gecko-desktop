import { FaHome, FaUser } from "react-icons/fa"
import { RiSettings2Fill } from "react-icons/ri"


function Sidebar() {
  return (
    <aside className="flex items-center justify-center bg-base-300 w-20 h-[100vh]">
      <ul className="flex flex-col items-center justify-center gap-4">
        <li><FaHome size={30}/></li>
        <li><FaUser size={30} /></li>
        <li><RiSettings2Fill size={30} /></li>
      </ul>
    </aside>
  )
}

export default Sidebar