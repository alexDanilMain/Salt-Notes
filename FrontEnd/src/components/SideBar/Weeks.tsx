import { useState } from "react";
import Days from "./Days";
import Arrow from "./svg/Arrow";

type Props = {
    number: number;
    name: string;
}

const days = Array.from({ length: 5 }, (_, i) => i + 1);

function Weeks({ number, name }: Props) {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const CurrentWeek = parseInt(pathSegments[1], 10);
    const CurrentDay = parseInt(pathSegments[2], 10);

    const [isOpen, setIsOpen] = useState(CurrentWeek ? CurrentWeek == number : false);
    const dropdownId = `dropdown-${number}`;

    return (
        <li>
            <button type="button" className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-200" aria-controls={dropdownId}
                onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="dropdown-example">
                <span className="flex-1 text-left rtl:text-right whitespace-nowrap">{name}</span>
                <Arrow />
            </button>
            <ul id={dropdownId} className={`py-2 ${isOpen ? 'block' : 'hidden'}`}>
                {days.map((dayNumber) => <Days key={name+dayNumber+number} week={number} number={dayNumber} isHighLighted={CurrentWeek == number && CurrentDay == dayNumber} />)}
            </ul>
        </li>
    )
}



export default Weeks