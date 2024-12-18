import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"


const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-4 pl-[20%] text-[15px]">

            <NavLink className="flex items-center border border-gray-300 border-r-0 px-4 py-2 gap-3 rounded-l" to="/add">
            <img className="w-5 h-5" src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add items</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l" to="/list">
            <img className="h-5 w-5" src={assets.order_icon} alt="" />
            <p className="hidden md:block">List items</p>
            </NavLink>

            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-4 py-2 rounded-l" to="/order">
            <img className="h-5 w-5" src={assets.order_icon} alt="" />
            <p className="hidden md:block">Orders</p>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar