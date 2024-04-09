import Weeks from "./Weeks"

const dummyWeek = Array(13).fill({name: "HellWeek"})
export default function Sidebar() {
    return (
        <aside className="">
            <ul className="mt-2 px-2 pl-6 ">
                {dummyWeek.map((week, index )=> <Weeks name={week.name} number={index} />)}
            </ul>
        </aside>

    )
}
