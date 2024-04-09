import Days from "./Days";

type Props = {
    number : number;
    name: string;
}

const days = Array.from({length: 5}, (_, i) => i + 1);

function Weeks({number, name}:Props) {
  return (
    <details className="mt-2 dropdown"> 
      <summary className="m-1 btn text-xl"> Week {number} - {name} </summary>
      <ul className="mt-2 list-disc px-2 pl-6 text-lg menu dropdown-content z-[1] bg-base-100 rounded-box">
        {days.map((number) => <Days number={number} /> )}
      </ul>
    </details>
  )
}

export default Weeks