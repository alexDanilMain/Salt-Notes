import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
    setInputState : Dispatch<SetStateAction<string>>;
}

const NoteEditor = ({setInputState}: Props) => {

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleCancle = () => {
        setInputState("");
        inputRef.current!.value = "";
      };
    
  return (
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
            onClick={() => setInputState(inputRef.current!.value)}
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
  );
};

export default NoteEditor;
