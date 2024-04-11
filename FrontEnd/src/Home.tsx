import Sidebar from "./components/SideBar/Sidebar";
import MobNotes from "./components/Notes/HtmlNotes/MobNotes";
import OtherNotes from "./components/Notes/HtmlNotes/OtherNotes";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import NoteEditor from "./components/NoteEditor/NoteEditor";
import { getCookie } from "./services/Cookies/Cookies";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getDayNotes } from "./api/Api";
import { useQuery } from "@tanstack/react-query";

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

    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const week = parseInt(pathSegments[1], 10);
    const day = parseInt(pathSegments[2], 10);


    console.log(week, day)
    const overallDayNumber = ((week - 1) * 5) + day;
    console.log(overallDayNumber)
    const { isPending, error, data: notes } = useQuery({
        queryKey: ['getDayNotes'],
        queryFn: () => getDayNotes(overallDayNumber)
    })
    
    console.log(notes);

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
