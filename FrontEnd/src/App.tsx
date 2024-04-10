import Sidebar from "./components/SideBar/Sidebar"
import HtmlNotes from "./components/Notes/HtmlNotes/HtmlNotes";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";

function App() {


  // const markdown = '# Hi, *Pluto*!'
  return (
    <>
      <nav className="flex h-14 z-40 w-full items-center fixed justify-start top-0 inset-x-0 bg-gradient-to-r from-[rgb(255,121,97)] to-[rgb(243,92,126)] py-1">
        <div className="container mx-auto">
          <p className="text-xl">&lt; Salt / &gt;</p>
        </div>
      </nav>

      <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
        <Sidebar />
        <div className="flex-1 h-[600px] sm:ml-64">
          <div className="w-full flex justify-end items-center gap-4 pr-4 bg-gray-50 border-b shadow-sm h-16">
            <button className="h-8 rounded-full bg-gray-200 hover:bg-gray-300 py-1 px-2"> Cancel Changes </button>
            <button className="h-8 rounded-full bg-green-400 hover:bg-green-500 py-1 px-2"> Commit Changes </button>
          </div>

          <div className="w-11/12 mx-auto mt-4">
            <textarea className="w-full resize-none outline-none bg-gray-200 rounded-md p-4" name="" id="" cols={30} rows={20}></textarea>
          </div>
        </div>

      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">

        <MobNotes />
        <OtherNotes />

      </section>
    </>
  )
}

export default App
