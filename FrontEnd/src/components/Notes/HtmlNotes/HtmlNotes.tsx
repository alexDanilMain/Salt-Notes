import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown-light.css";
import { useState } from "react";
import Arrow from "../../SideBar/svg/Arrow";


type Props = {
    name: string,
    text: string
}
function HtmlNotes({name, text}:Props) {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleOpen = () => setIsOpen(!isOpen);

    const noText = `# No Notes Yet! 
    Add notes by typing and commiting above!
    `;

  return (
    <article className="w-11/12 py-4 ">
      <h2 className="text-2xl cursor-pointer w-full flex justify-center items-center gap-4" onClick={toggleOpen}> <span>{name} </span>  <Arrow/> </h2> 
        <div 
        className={`markdown-body dropdown-wrapper dropdown-animation ${isOpen ? "py-4 border-b-2 border-black overflow-y-auto overflow-x-hidden" : "overflow-hidden hidden"} `}
        style={{ maxHeight: isOpen ? '500px' : '0' }}>
          <Markdown remarkPlugins={[remarkGfm]}>{text == "" ? noText : text}</Markdown>
        </div>
    </article>
  );
}

export default HtmlNotes;
