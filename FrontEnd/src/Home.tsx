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
import Locked from "./imgs/Lock.svg";
import Loading from "./components/SideBar/svg/Loading";
type User = {
  picture: string;
};

function Home() {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    let Token = getCookie("saltnote_key");
    if (Token == undefined) {
      navigate("/login");
    } else {
      setUserImage((jwtDecode(Token) as User).picture);
    }
  }, []);

  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const week = parseInt(pathSegments[1], 10);
  const day = parseInt(pathSegments[2], 10);

  const overallDayNumber = (week - 1) * 5 + day;

  const {
    isLoading,
    error,
    data: notes,
  } = useQuery({
    queryKey: ["getDayNotes"],
    queryFn: () => getDayNotes(overallDayNumber),
  });

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

  if (isLoading)
    return (
      <>
        <NavBar profilePicture={userImage} />

        <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
          <Sidebar />
          <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
            <Loading />
          </section>
        </section>
      </>
    );

  if (error) {
    if (error.message.includes("Accessable")) {
      return (
        <>
          <NavBar profilePicture={userImage} />

          <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
            <Sidebar />
            <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
              <img src={Locked} alt="Lock" className="w-[240px] sm:w-[350px]" />
              <h2 className="text-xl"> {error.message}</h2>
            </section>
          </section>
        </>
      );
    }else{
        <>
        <NavBar profilePicture={userImage} />

        <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
          <Sidebar />
          <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12 sm:ml-64">
            <h2 className="text-xl">Error with message : {error.message} </h2>
          </section>
        </section>
      </>
    }
  }

  return (
    <>
      <NavBar profilePicture={userImage} />

      <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
        <Sidebar />
        <NoteEditor setInputState={setInput} InputState={input} />
      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">
        <MobNotes text={input} />
        <OtherNotes notes={notes!.otherMobNotes.$values} />
      </section>
    </>
  );
}

export default Home;
