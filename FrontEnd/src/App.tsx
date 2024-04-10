import Sidebar from "./components/SideBar/Sidebar";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";
import { useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");

  const handleCancle = () => {
    setInput("");
    inputRef.current!.value = "";
  };

  //test comment
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
          <div className="w-full flex justify-between items-center bg-gray-50 border-b shadow-sm h-16 text-[8px] sm:text-sm lg:text-base">

            <h3 className="pl-4 lg:text-xl">Write Markdown Text Here!</h3>

            <div className="flex gap-4 pr-4">
              <button
                className="h-8 rounded-full bg-gray-200 hover:bg-gray-300 py-1 px-2 truncate"
                onClick={() => handleCancle()}
              >
                {" "}
                Cancel Changes{" "}
              </button>
              <button
                className="h-8 rounded-full bg-green-400 hover:bg-green-500 py-1 px-2 truncate"
                onClick={() => setInput(inputRef.current!.value)}
              >
                {" "}
                Commit Changes{" "}
              </button>
            </div>
          </div>

          <div className="w-11/12 mx-auto mt-4">
            <textarea
              className="w-full resize-none outline-none bg-gray-200 rounded-md p-4"
              ref={inputRef}
              name=""
              id=""
              cols={30}
              rows={20}
            ></textarea>
          </div>
        </div>
      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">
        <MobNotes text={input} />

        <OtherNotes />
      </section>
    </>
  );
}

export default App;
