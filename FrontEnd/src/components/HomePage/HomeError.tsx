import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";


type Props = {
    message: string
}
export default function HomeError ({message}:Props) {
  const navigate = useNavigate()
  return (
    <>
    <NavBar  />

    <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
      <Sidebar />
      <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
        <h2 className="text-xl"> {message} </h2>
        {message.includes("logged in") && <h3 className="text-xl cursor-pointer text-blue-500" onClick={()=>navigate("/login")}> Click here to login </h3> } 
      </section>
    </section>
  </>
  )
}
