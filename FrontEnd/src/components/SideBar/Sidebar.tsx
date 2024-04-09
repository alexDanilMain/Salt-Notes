import { useState } from "react";
import Weeks from "./Weeks"

const dummyWeek = Array(13).fill({ name: "HellWeek" })
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    return (
        <>
            <button onClick={toggleMenu} data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>


            <aside className={`absolute top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? '' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 text-black">
                    <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-200 focus:outline-none lg:hidden focus:bg-gray-200">
                        <svg width="40" height="40" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" /></svg>
                    </button>
                    <ul className="mt-2 px-2 pl-6 ">
                        {dummyWeek.map((week, index) => <Weeks name={week.name} number={index} />)}
                    </ul>
                </div>
            </aside>
        </>
    )
}




