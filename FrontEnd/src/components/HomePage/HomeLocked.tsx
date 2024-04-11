import NavBar from "../NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";
import Locked from "../../imgs/Lock.svg";

type Props = {
    message: string
}
export default function HomeLocked ({message}:Props) {
  return (
    <>
    <NavBar  />

    <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
      <Sidebar />
      <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
        <img src={Locked} alt="Lock" className="w-[240px] sm:w-[350px]" />
        <h2 className="text-xl"> {message}</h2>
      </section>
    </section>
  </>
  )
}
