import React, { useState } from 'react'

export default function Tinker() {
    const [entries, setEntries] = useState([]);

    function handleSubmit(e) {
        if (e.key === "Enter") {
            setEntries([...entries, e.target.value]);
        }
    }

    let data = new Float32Array(15);
    data.fill(10);

    function handleClick(e) {
        data[0] = 17;
        console.log(data)
    }

  return (
    <div className="border-4 border-red-500 flex flex-col items-center">
        <input className="border-2 border-yellow-300 rounded-full shadow-xl w-2/3 pl-8 py-2 text-lg text-black focus:outline-none"
            placeholder="Enter field"
            onKeyPress={handleSubmit}
            >
        </input>
        <div className="my-10">
            <button className="rounded-full h-20 w-20 bg-red-500 shadow-xl animate-pulse"
                onClick={handleClick}>
                Click
            </button>
        </div>
    </div>
  )
}