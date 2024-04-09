import { useState } from "react";
import Days from "./Days";

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
                <button type="button" className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-200"  aria-controls={dropdownId} 
                onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="dropdown-example">
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Week {number} - {name}</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <ul id={dropdownId} className={`py-2 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
                    {days.map((number) => <Days number={number} />)}
                </ul>
            </li>
  
    )
}



export default Weeks