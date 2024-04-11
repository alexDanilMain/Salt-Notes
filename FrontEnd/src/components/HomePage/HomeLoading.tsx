import NavBar from "../NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";
import Loading from "../SideBar/svg/Loading";

export default function HomeLoading () {
  return (
    <>
    <NavBar  />

    <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
      <Sidebar />
      <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
        <Loading />
      </section>
    </section>
  </>
  )
}
