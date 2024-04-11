import Sidebar from "./components/SideBar/Sidebar";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import { getCookie } from "./services/Cookies/Cookies";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type User = {
    picture :string;
}

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");


  useEffect(() => {
    let Token = getCookie("saltnote_key");
    if (Token == undefined) {
        navigate("/login")
    }else{
        setUserImage((jwtDecode(Token) as User).picture);
    }
  }, []);
  //test comment
  return (
    <>
      <NavBar profilePicture={userImage} />

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

export default Home;
