import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDayNotes } from "../../api/Api";
import Sidebar from "../SideBar/Sidebar";
import NavBar from "../NavBar/NavBar";
import NoteEditor from "../NoteEditor/NoteEditor";
import MobNotes from "../Notes/HtmlNotes/MobNotes";
import OtherNotes from "../Notes/HtmlNotes/OtherNotes";
import HomeLoading from "./HomeLoading";
import HomeLocked from "./HomeLocked";
import HomeError from "./HomeError";

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");

  // useEffect(() => {
  //   let Token = getCookie("saltnote_key");
  //   if (Token == undefined) {
  //     navigate("/login");
  //   }
  // }, []);

  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const week = parseInt(pathSegments[1], 10);
  const day = parseInt(pathSegments[2], 10);

  useEffect(() => {
    if (isNaN(week) || isNaN(day) || day > 5 || week > 13) {
      navigate("/about");
    }
  }, [week, day, navigate]);

  const overallDayNumber = (week - 1) * 5 + day;

  const {
    isLoading,
    error,
    data: notes,
  } = useQuery({
    queryKey: ["getDayNotes", window.location.href],
    queryFn: () => getDayNotes(overallDayNumber),
    retry: false
  });

  useEffect(() => {
    if (notes?.yourNote) {
      setInput(notes.yourNote.noteContent);
    }
  }, [notes]);

  if (isLoading) return <HomeLoading />;

  if (error) {
    if (error.message.includes("Accessable")) {
      return <HomeLocked message={error.message} />;
    }else if(!error.message){
      return <HomeError message="You are not logged in!" />
    } 
    else {
      return (
        <HomeError message={error.message} />
      );
    }
  }

  return (
    <>
      <NavBar />

      <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
        <Sidebar />
        <NoteEditor setInputState={setInput} InputState={input} day={overallDayNumber}/>
      </section>

      <section className="text-black sm:ml-64 flex-1 flex justify-center flex-col items-center overflow-hidden">
        <MobNotes text={input} />
        <OtherNotes notes={notes!.otherMobNotes.$values} />
      </section>
    </>
  );
}

export default Home;
