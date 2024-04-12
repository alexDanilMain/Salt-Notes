import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { postDayNotes } from "../../api/Api";
import { ToastContainer, ToastPosition, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  setInputState: Dispatch<SetStateAction<string>>;
  InputState: string;
  day:number;
};

const NoteEditor = ({ setInputState, InputState, day }: Props) => {
  
  const queryClient = useQueryClient();
  const [text, setText] = useState(InputState);

  const handleCancle = () => {
    setText(InputState);
  };

  const mutation = useMutation({
    mutationFn: (content: string) => {
      return postDayNotes(content, day);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getDayNotes"] });
      toast.success("Updated!", {
        position: "bottom-right" as ToastPosition,
      });
      setInputState(text);
    },
    onError: (error: any) => { 
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right" as ToastPosition,
      });
    }
  });

  const handleSubmit = () => {
    mutation.mutate(text);
  };

  useEffect(()=>{
    setText(InputState)
  },[InputState])

  return (
    <div className="flex-1 h-[600px] sm:ml-64">
       <ToastContainer />
      <div className="w-full flex justify-between items-center bg-gray-50 border-b shadow-sm h-16 text-[8px] sm:text-sm lg:text-base">
        <h3 className="pl-4 lg:text-xl">Write <a href="https://daringfireball.net/projects/markdown/basics" target="_blank" className="text-blue-500 cursor-pointer">Markdown</a> Text Here!</h3>

        <div className="flex gap-4 pr-4">

          <button
            className="h-8 rounded-full bg-gray-200 hover:bg-gray-300 py-1 px-4 truncate"
            onClick={() => handleCancle()}
          >
            {" "}
            Cancel Changes{" "}
          </button>
          <button
            className="h-8 rounded-full bg-green-400 hover:bg-green-500 py-1 px-4 truncate"
            onClick={() => handleSubmit()}
          >
            {" "}
            Commit Changes{" "}
          </button>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-4">
        <textarea
          className="w-full resize-none outline-none bg-gray-200 rounded-md p-4"
          name=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols={30}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteEditor;
