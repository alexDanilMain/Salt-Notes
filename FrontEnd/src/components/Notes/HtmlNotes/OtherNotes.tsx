import { Note } from "../../../api/Api"
import HtmlNotes from "./HtmlNotes"

type Props = {
    notes : Note[]
}
function OtherNotes({notes}: Props) {
    return (
        <>
        <h2 className="text-3xl py-4 border-b-2 border-black">Other Mobs</h2>

        {notes.map(({mobName, noteContent}) => <HtmlNotes name={mobName} text={noteContent} />)}    
      

        </>

    )
  }
  
  export default OtherNotes
