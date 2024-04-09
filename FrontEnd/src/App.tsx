import Sidebar from "./components/SideBar/Sidebar"

function App() {

  return (
    <>
      <nav className="flex h-14 z-40 w-full items-center justify-start top-0 inset-x-0 bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
        <div className="container mx-auto">
          <p className="text-xl">&lt; Salt / &gt;</p>
        </div>
      </nav>

      <section className="flex w-full mx-auto relative flex-col sm:flex-row">
        <Sidebar />
        <div className="flex-1 h-96 ml-64 border-2 border-black">
          <div className="w-full flex justify-end items-center gap-4 pr-4 bg-gray-50 border-b border-2 shadow-md h-16">
            <button className="h-8 rounded-full bg-gray-200 hover:bg-gray-300 py-1 px-2"> Cancel Changes </button>
            <button className="h-8 rounded-full bg-green-400 hover:bg-green-500 py-1 px-2"> Commit Changes </button>
          </div>

          <div className="w-11/12 mx-auto mt-4">
            <textarea className="w-full resize-none outline-none bg-gray-200 rounded-md p-4" name="" id="" cols={30} rows={10}></textarea>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
