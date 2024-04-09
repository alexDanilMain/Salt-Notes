import Sidebar from "./components/SideBar/Sidebar"

function App() {

  return (
    <>
        <nav className="flex h-14 z-40 w-full items-center justify-start top-0 inset-x-0 bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
            <div className="container mx-auto">
              <p className="text-xl">&lt; Salt / &gt;</p>
            </div>
        </nav>

        <section className="flex w-full mx-auto relative flex-col">
          <Sidebar />
          <div className="w-full h-64 bg-black">
            
          </div>
        </section>
    </>
  )
}

export default App
