import { useEffect } from "react";
import GoogleLogIn from "./components/GoogleLogin/GoogleLogin";
import NavBar from "./components/NavBar/NavBar";
import SaltyNote from "./imgs/SaltyNote.png";
import { getCookie } from "./services/Cookies/Cookies";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    let Token = getCookie("saltnote_key");
    if (typeof Token == "string") {
        navigate("/home")
    }
  }, []);

  return (

    <main className="bg-gray-50 h-screen">
      <NavBar />
      <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12">
        <img src={SaltyNote} alt="Orange note that says salt notes" className="w-[240px] sm:w-[350px]"/>
        <GoogleLogIn />
      </section>
    </main>
  );
}

export default App;
