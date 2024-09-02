import { BiNotification, BiSearch, BiSolidPlusCircle } from "react-icons/bi"
import { CgToday } from "react-icons/cg"
import { CiSettings } from "react-icons/ci"
import { GoSignOut } from "react-icons/go"
import { MdAccountCircle, MdUpcoming } from "react-icons/md"
import { useAuthContext } from "../auth/AuthContext"

const LeftNavbar = () => {
    const{handleSignOut}= useAuthContext()
    return (
        <nav className="w-[300px] pt-6 bg-slate-300 h-screen fixed top-0 left-0 [&>*]:px-4">
            <header className="my-3 flex items-center justify-between">
                <div className="flex items-center text-xl"><MdAccountCircle className="text-4xl"/><span>username</span></div>
                <div className="flex text-3xl"><BiNotification/><CiSettings/></div>

            </header>
            <ul className="pl-4 [&>li:hover]:bg-gray-100 [&>li]:py-1 [&>li]:cursor-pointer">
                <li className=""><BiSolidPlusCircle className="text-red-800 border-2 border-black rounded-full"/><span>Add Task</span></li>
                <li><BiSearch/><span>Search</span></li>
                <li><CgToday/><span>Today</span></li>
                <li><MdUpcoming/><span>Upcoming</span></li>
                <li onClick={()=>handleSignOut()}><GoSignOut/><span>signout</span></li>
            </ul>
            
        </nav>
    )
}

export default LeftNavbar