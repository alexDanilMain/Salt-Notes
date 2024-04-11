import Sidebar from "./components/SideBar/Sidebar";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";
import { useRef, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import NoteEditor from "./components/NoteEditor/NoteEditor";

function App() {

  const [input, setInput] = useState<string>("");


  //test comment
  return (
    <>
      <NavBar />

      <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
        <Sidebar />
        <NoteEditor setInputState={setInput} />
      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">
        <MobNotes text={input} />
        <OtherNotes />
      </section>
    </>
  );
}

export default App;
