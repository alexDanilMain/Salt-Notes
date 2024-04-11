import Sidebar from "./components/SideBar/Sidebar";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import { getCookie } from "./services/Cookies/Cookies";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getDayNotes } from "./api/Api";
import { useQuery } from "@tanstack/react-query";

type User = {
    picture :string;
}

function Home() {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    let Token = getCookie("saltnote_key");
    if (Token == undefined) {
        navigate("/login")
    }else{
        setUserImage((jwtDecode(Token) as User).picture);
    }
  }, []);

    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const week = parseInt(pathSegments[1], 10);
    const day = parseInt(pathSegments[2], 10);

    const overallDayNumber = ((week - 1) * 5) + day;
 
    const { isLoading, error, data: notes } = useQuery({
        queryKey: ['getDayNotes'],
        queryFn: () => getDayNotes(overallDayNumber)
    })

    useEffect(() => {
        if (isNaN(week) || isNaN(day) || day > 5 || week > 13) {
          navigate("/about");
        }
      }, [week, day, navigate]);
    

    useEffect(() => {
        if (notes?.yourNote) {
          setInput(notes.yourNote.noteContent);
        }
      }, [notes]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>An error occurred: {error.message}</div>;



  return (
    <>
      <NavBar profilePicture={userImage} />

      <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
        <Sidebar />
        <NoteEditor setInputState={setInput} InputState={input}/>
      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">
        <MobNotes text={input} />
        <OtherNotes notes = {notes!.otherMobNotes.$values} />
      </section>
    </>
  );
}

export default Home;
