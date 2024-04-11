type Props = {
    number: number;
    week: number
}
function Days({week, number }: Props) {
    return (
        <li>
            <a href={`/notes/${week}/${number}`} className="flex items-center w-full p-2 py-1 transition duration-75 rounded-lg pl-11 group hover:bg-gray-200 text-gray-600 ">Day {number}</a>
        </li>
    )
}

export default Days