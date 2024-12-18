import { assets } from "../assets/assets.js"

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
        <button onClick={() =>setToken('')} className="bg-gray-600 text-white py-2 px-5 rounded-full  sm:py-2  sm:text-sm  text-xs">Logout</button>
    </div>
  )
}

export default Navbar