import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/SideBar/Sidebar";
import SaltyNote from "./imgs/SaltyNote.png";

function About() {
    return (
        <>
          <NavBar />
    
          <section className="flex w-full mx-auto relative flex-col sm:flex-row mt-14">
            <Sidebar />
            <section className="flex w-full mx-auto relative flex-col justify-center items-center h-full gap-12 mt-12">
                <img src={SaltyNote} alt="Orange note that says salt notes" className="w-[240px] sm:w-[350px]"/>
                <h2>Welcome to Salt Notes</h2>
                <p>Click on the sidebar to choose a day! (Hamburger Icon if you're on mobile)</p>
        </section>
          </section>
    
        </>
      );
}

export default About