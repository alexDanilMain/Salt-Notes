import { useState } from "react";
import Days from "./Days";
import Arrow from "./svg/Arrow";

type Props = {
    number: number;
    name: string;
}

const days = Array.from({ length: 5 }, (_, i) => i + 1);

function Weeks({ number, name }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownId = `dropdown-${number}`;

    return (
        <li>
            <button type="button" className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-200" aria-controls={dropdownId}
                onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="dropdown-example">
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Week {number} - {name}</span>
                <Arrow />
            </button>
            <ul id={dropdownId} className={`py-2 ${isOpen ? 'block' : 'hidden'}`}>
                {days.map((dayNumber) => <Days week={number} number={dayNumber} />)}
            </ul>
        </li>
    )
}



export default Weeks