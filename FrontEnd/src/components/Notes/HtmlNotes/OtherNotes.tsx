import HtmlNotes from "./HtmlNotes"
import { markdown } from "./MobNotes"

function OtherNotes() {
    return (
        <>
        <h2 className="text-3xl py-4 border-b-2 border-black">Other Mobs</h2>

        <HtmlNotes name="The Survivors" text={markdown} />
        <HtmlNotes name="Keyboard Warriors" text={markdown} />

        </>

    )
  }
  
  export default OtherNotes
