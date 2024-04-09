
type Props = {
    number: number;
}
function Days({ number }: Props) {
    return (
        <li>
            <a href="#" className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-200">Day {number}</a>
        </li>
    )
}

export default Days